import { DoctorLeave, Appointment } from '@/types';
import { MOCK_LEAVES } from '@/lib/supabase/mock-data';
import { AppointmentService } from './appointment.service';

let leavesStore: DoctorLeave[] = [...MOCK_LEAVES];

export class LeaveService {
  static getDoctorLeaves(doctorId: string): DoctorLeave[] {
    return leavesStore.filter((l) => l.doctor_id === doctorId);
  }

  static async submitLeave(params: {
    doctorId: string;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
    reason?: string;
  }): Promise<{
    success: boolean;
    leave?: DoctorLeave;
    affectedAppointments: Appointment[];
  }> {
    const newLeave: DoctorLeave = {
      id: `leave-${Date.now()}`,
      doctor_id: params.doctorId,
      start_date: params.startDate,
      end_date: params.endDate,
      reason: params.reason,
      status: 'APPROVED',
      created_at: new Date().toISOString()
    };

    leavesStore.unshift(newLeave);

    // Identify affected appointments
    const allAppointments = AppointmentService.getAppointments();
    const affectedAppointments = allAppointments.filter((apt) => {
      if (apt.doctor_id !== params.doctorId) return false;
      if (apt.status === 'CANCELLED' || apt.status === 'NEEDS_RESCHEDULE') return false;

      const aptDateStr = new Date(apt.appointment_start).toISOString().split('T')[0];
      return aptDateStr >= params.startDate && aptDateStr <= params.endDate;
    });

    // Mark affected appointments as NEEDS_RESCHEDULE
    affectedAppointments.forEach((apt) => {
      apt.status = 'NEEDS_RESCHEDULE';
      apt.updated_at = new Date().toISOString();
    });

    return {
      success: true,
      leave: newLeave,
      affectedAppointments
    };
  }
}
