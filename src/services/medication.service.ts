import { Prescription, MedicationReminder } from '@/types';

const prescriptionsStore: Prescription[] = [];
const medicationRemindersStore: MedicationReminder[] = [];

export class MedicationService {
  static createPrescription(params: {
    appointmentId: string;
    doctorId: string;
    patientId: string;
    notes?: string;
    items: Array<{
      medicine_name: string;
      dosage: string;
      frequency: string;
      instructions?: string;
      start_date: string;
      end_date: string;
    }>;
  }): Prescription {
    const prescriptionId = `rx-${Date.now()}`;
    const itemsWithIds = params.items.map((item, idx) => {
      const itemId = `rx-item-${Date.now()}-${idx}`;
      
      // Auto-schedule reminders based on frequency
      const reminder: MedicationReminder = {
        id: `med-rem-${Date.now()}-${idx}`,
        prescription_item_id: itemId,
        patient_id: params.patientId,
        reminder_time: '08:00',
        next_run_at: new Date(Date.now() + 3600000).toISOString(),
        status: 'PENDING',
        retry_count: 0,
        created_at: new Date().toISOString()
      };
      medicationRemindersStore.push(reminder);

      return {
        id: itemId,
        prescription_id: prescriptionId,
        ...item
      };
    });

    const prescription: Prescription = {
      id: prescriptionId,
      appointment_id: params.appointmentId,
      doctor_id: params.doctorId,
      patient_id: params.patientId,
      notes: params.notes,
      created_at: new Date().toISOString(),
      items: itemsWithIds
    };

    prescriptionsStore.unshift(prescription);
    return prescription;
  }

  static getPatientPrescriptions(patientId: string): Prescription[] {
    return prescriptionsStore.filter((p) => p.patient_id === patientId);
  }

  static getPatientReminders(patientId: string): MedicationReminder[] {
    return medicationRemindersStore.filter((r) => r.patient_id === patientId);
  }
}
