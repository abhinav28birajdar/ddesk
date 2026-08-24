import { describe, it, expect, beforeEach } from 'vitest';
import { AppointmentService } from '../src/services/appointment.service';
import { LeaveService } from '../src/services/leave.service';

describe('Ddesk Concurrency & Booking Conflict Resolution', () => {

  it('should generate valid time slots for an available doctor', async () => {
    const slots = await AppointmentService.getAvailableSlots(
      'd1',
      'h1',
      '2026-08-25'
    );
    expect(Array.isArray(slots)).toBe(true);
    expect(slots.length).toBeGreaterThan(0);
  });

  it('should successfully create a temporary 5-minute slot hold', async () => {
    const start = new Date(Date.now() + 86400000 * 3).toISOString();
    const end = new Date(Date.now() + 86400000 * 3 + 1800000).toISOString();

    const holdResult = await AppointmentService.createHold({
      doctorId: 'd1',
      patientId: 'patient-test-1',
      hospitalId: 'h1',
      start,
      end
    });

    expect(holdResult.success).toBe(true);
    expect(holdResult.code).toBe('OK');
  });

  it('should prevent double booking when another patient attempts to book the same slot', async () => {
    const start = new Date(Date.now() + 172800000).toISOString();
    const end = new Date(Date.now() + 172800000 + 1800000).toISOString();

    // Patient A books
    const firstBooking = await AppointmentService.createAppointmentAtomic({
      patientId: 'patient-A',
      doctorId: 'd1',
      hospitalId: 'h1',
      start,
      end,
      symptoms: 'Chest pain'
    });

    expect(firstBooking.success).toBe(true);

    // Patient B attempts concurrent booking for the SAME slot
    const secondBooking = await AppointmentService.createAppointmentAtomic({
      patientId: 'patient-B',
      doctorId: 'd1',
      hospitalId: 'h1',
      start,
      end,
      symptoms: 'Headache'
    });

    expect(secondBooking.success).toBe(false);
    expect(secondBooking.code).toBe('SLOT_UNAVAILABLE');
  });

  it('should update conflicting appointments to NEEDS_RESCHEDULE when a doctor submits leave', async () => {
    const start = '2026-10-10T10:00:00.000Z';
    const end = '2026-10-10T10:30:00.000Z';

    // Book an appointment on October 10
    await AppointmentService.createAppointmentAtomic({
      patientId: 'patient-C',
      doctorId: 'd1',
      hospitalId: 'h1',
      start,
      end,
      symptoms: 'Fever'
    });

    // Doctor submits leave for October 10
    const leaveResult = await LeaveService.submitLeave({
      doctorId: 'd1',
      startDate: '2026-10-10',
      endDate: '2026-10-10',
      reason: 'Vacation'
    });

    expect(leaveResult.success).toBe(true);
    expect(leaveResult.affectedAppointments.length).toBeGreaterThan(0);
    expect(leaveResult.affectedAppointments[0].status).toBe('NEEDS_RESCHEDULE');
  });

});
