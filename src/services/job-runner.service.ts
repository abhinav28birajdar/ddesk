import { getAIProvider } from '@/lib/ai/provider';
import { getEmailProvider } from '@/lib/email/provider';
import { AppointmentService } from './appointment.service';

export class JobRunnerService {
  static async processPendingJobs(): Promise<{
    processedAI: number;
    processedNotifications: number;
    errors: string[];
  }> {
    const errors: string[] = [];
    let processedAI = 0;
    let processedNotifications = 0;

    // Process pending AI Pre-Visit & Post-Visit jobs
    const appointments = AppointmentService.getAppointments();
    const pendingAI = appointments.filter((apt) => apt.pre_visit_ai_status === 'PENDING');

    const aiProvider = getAIProvider();

    for (const apt of pendingAI) {
      try {
        const summary = await aiProvider.generatePreVisitSummary({
          symptoms: apt.symptoms,
          duration: apt.symptom_duration,
          severity: apt.symptom_severity,
          additionalNotes: apt.additional_notes
        });
        apt.pre_visit_summary = summary;
        apt.pre_visit_ai_status = 'SUCCESS';
        processedAI++;
      } catch (err: any) {
        apt.pre_visit_ai_status = 'FAILED';
        errors.push(`AI summary failed for appointment ${apt.id}: ${err.message}`);
      }
    }

    // Process Notification jobs
    const emailProvider = getEmailProvider();
    for (const apt of appointments) {
      if (apt.patient?.email && apt.status === 'CONFIRMED') {
        try {
          await emailProvider.sendEmail({
            to: apt.patient.email,
            subject: `Ddesk Appointment Confirmation - ${apt.doctor?.profile?.full_name || 'Your Doctor'}`,
            html: `<p>Your appointment on ${new Date(apt.appointment_start).toLocaleString()} is confirmed.</p>`
          });
          processedNotifications++;
        } catch (err: any) {
          errors.push(`Email failed for appointment ${apt.id}: ${err.message}`);
        }
      }
    }

    return { processedAI, processedNotifications, errors };
  }
}
