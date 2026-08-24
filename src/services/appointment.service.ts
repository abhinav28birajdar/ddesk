import {
  MOCK_DOCTORS,
  MOCK_AVAILABILITY,
  MOCK_APPOINTMENTS,
  MOCK_LEAVES
} from '@/lib/supabase/mock-data';
import { TimeSlot, Appointment } from '@/types';

// In-memory hold store for local state
const activeHoldsStore: Array<{
  id: string;
  doctorId: string;
  patientId: string;
  hospitalId: string;
  start: string;
  end: string;
  expiresAt: number;
}> = [];

// In-memory appointments store
let appointmentsStore: Appointment[] = [...MOCK_APPOINTMENTS];

export class AppointmentService {
  /**
   * Generates dynamic available time slots for a given doctor, hospital, and target date.
   */
  static async getAvailableSlots(
    doctorId: string,
    hospitalId: string,
    dateStr: string // YYYY-MM-DD
  ): Promise<TimeSlot[]> {
    const targetDate = new Date(`${dateStr}T00:00:00`);
    const dayOfWeek = targetDate.getDay(); // 0 = Sunday, 6 = Saturday

    // 1. Check if doctor is on leave
    const isOnLeave = MOCK_LEAVES.some(
      (leave) =>
        leave.doctor_id === doctorId &&
        leave.status === 'APPROVED' &&
        dateStr >= leave.start_date &&
        dateStr <= leave.end_date
    );

    if (isOnLeave) {
      return [];
    }

    // 2. Find doctor availability blocks for this day of week
    const availabilities = MOCK_AVAILABILITY.filter(
      (av) => av.doctor_id === doctorId && av.day_of_week === dayOfWeek
    );

    if (availabilities.length === 0) {
      return [];
    }

    const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId);
    const slotDuration = doctor?.slot_duration || 30; // minutes
    const bufferMinutes = doctor?.buffer_minutes || 10; // minutes

    const generatedSlots: TimeSlot[] = [];

    for (const av of availabilities) {
      const [startHour, startMin] = av.start_time.split(':').map(Number);
      const [endHour, endMin] = av.end_time.split(':').map(Number);

      let slotStart = new Date(targetDate);
      slotStart.setHours(startHour, startMin, 0, 0);

      const blockEnd = new Date(targetDate);
      blockEnd.setHours(endHour, endMin, 0, 0);

      while (slotStart.getTime() + slotDuration * 60000 <= blockEnd.getTime()) {
        const slotEnd = new Date(slotStart.getTime() + slotDuration * 60000);
        const isoStart = slotStart.toISOString();
        const isoEnd = slotEnd.toISOString();

        // Check if in the past
        const isPast = slotStart.getTime() < Date.now();

        // Check if conflicts with existing appointment
        const isBooked = appointmentsStore.some(
          (apt) =>
            apt.doctor_id === doctorId &&
            apt.status !== 'CANCELLED' &&
            apt.status !== 'NEEDS_RESCHEDULE' &&
            new Date(apt.appointment_start) < slotEnd &&
            new Date(apt.appointment_end) > slotStart
        );

        // Check if conflicts with active hold
        const isHeld = activeHoldsStore.some(
          (h) =>
            h.doctorId === doctorId &&
            h.expiresAt > Date.now() &&
            new Date(h.start) < slotEnd &&
            new Date(h.end) > slotStart
        );

        const isAvailable = !isPast && !isBooked && !isHeld;
        const reason = isPast
          ? 'Past Time'
          : isBooked
          ? 'Already Booked'
          : isHeld
          ? 'Held by another user'
          : undefined;

        // Display string format "09:00 AM"
        const displayTime = slotStart.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        generatedSlots.push({
          start_time: isoStart,
          end_time: isoEnd,
          display_time: displayTime,
          is_available: isAvailable,
          reason
        });

        // Advance slot pointer by slot duration + buffer
        slotStart = new Date(slotEnd.getTime() + bufferMinutes * 60000);
      }
    }

    return generatedSlots;
  }

  /**
   * Temporary Slot Hold creation with 5-minute TTL.
   */
  static async createHold(params: {
    doctorId: string;
    patientId: string;
    hospitalId: string;
    start: string;
    end: string;
  }): Promise<{ success: boolean; holdId?: string; code?: string; message?: string }> {
    const startTime = new Date(params.start).getTime();
    const endTime = new Date(params.end).getTime();

    // Check existing appointments
    const conflictApt = appointmentsStore.find(
      (apt) =>
        apt.doctor_id === params.doctorId &&
        apt.status !== 'CANCELLED' &&
        apt.status !== 'NEEDS_RESCHEDULE' &&
        new Date(apt.appointment_start).getTime() < endTime &&
        new Date(apt.appointment_end).getTime() > startTime
    );

    if (conflictApt) {
      return {
        success: false,
        code: 'SLOT_UNAVAILABLE',
        message: 'This slot has already been booked by another patient.'
      };
    }

    // Check holds by OTHER patients
    const conflictHold = activeHoldsStore.find(
      (h) =>
        h.doctorId === params.doctorId &&
        h.patientId !== params.patientId &&
        h.expiresAt > Date.now() &&
        new Date(h.start).getTime() < endTime &&
        new Date(h.end).getTime() > startTime
    );

    if (conflictHold) {
      return {
        success: false,
        code: 'SLOT_HELD',
        message: 'This slot is currently held by another user. Please select another slot.'
      };
    }

    // Clear existing holds for this patient
    const existingIndex = activeHoldsStore.findIndex(
      (h) => h.patientId === params.patientId && h.doctorId === params.doctorId
    );
    if (existingIndex !== -1) {
      activeHoldsStore.splice(existingIndex, 1);
    }

    const holdId = `hold-${Date.now()}`;
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    activeHoldsStore.push({
      id: holdId,
      doctorId: params.doctorId,
      patientId: params.patientId,
      hospitalId: params.hospitalId,
      start: params.start,
      end: params.end,
      expiresAt
    });

    return { success: true, holdId, code: 'OK' };
  }

  /**
   * Atomic appointment booking transaction logic.
   */
  static async createAppointmentAtomic(params: {
    patientId: string;
    doctorId: string;
    hospitalId: string;
    start: string;
    end: string;
    symptoms: string;
    symptomDuration?: string;
    symptomSeverity?: string;
    additionalNotes?: string;
  }): Promise<{ success: boolean; appointment?: Appointment; code?: string; message?: string }> {
    const startTime = new Date(params.start).getTime();
    const endTime = new Date(params.end).getTime();

    // 1. Check double booking
    const conflictApt = appointmentsStore.find(
      (apt) =>
        apt.doctor_id === params.doctorId &&
        apt.status !== 'CANCELLED' &&
        apt.status !== 'NEEDS_RESCHEDULE' &&
        new Date(apt.appointment_start).getTime() < endTime &&
        new Date(apt.appointment_end).getTime() > startTime
    );

    if (conflictApt) {
      return {
        success: false,
        code: 'SLOT_UNAVAILABLE',
        message: 'This slot was just booked by another patient. Please select another time.'
      };
    }

    const doctor = MOCK_DOCTORS.find((d) => d.id === params.doctorId);
    const hospital = doctor?.hospitals?.find((h) => h.id === params.hospitalId) || doctor?.hospitals?.[0];

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patient_id: params.patientId,
      doctor_id: params.doctorId,
      hospital_id: params.hospitalId,
      appointment_start: params.start,
      appointment_end: params.end,
      status: 'CONFIRMED',
      symptoms: params.symptoms,
      symptom_duration: params.symptomDuration,
      symptom_severity: params.symptomSeverity,
      additional_notes: params.additionalNotes,
      pre_visit_ai_status: 'PENDING',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      doctor,
      hospital
    };

    appointmentsStore.unshift(newApt);

    // Clean up active hold
    const holdIndex = activeHoldsStore.findIndex(
      (h) => h.patientId === params.patientId && h.doctorId === params.doctorId
    );
    if (holdIndex !== -1) {
      activeHoldsStore.splice(holdIndex, 1);
    }

    return { success: true, appointment: newApt, code: 'OK' };
  }

  static getAppointments(): Appointment[] {
    return appointmentsStore;
  }

  static cancelAppointment(appointmentId: string): boolean {
    const apt = appointmentsStore.find((a) => a.id === appointmentId);
    if (apt) {
      apt.status = 'CANCELLED';
      apt.updated_at = new Date().toISOString();
      return true;
    }
    return false;
  }
}
