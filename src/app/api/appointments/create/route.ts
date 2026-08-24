import { NextResponse } from 'next/server';
import { AppointmentService } from '@/services/appointment.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, doctorId, hospitalId, start, end, symptoms, symptomDuration, symptomSeverity, additionalNotes } = body;

    const result = await AppointmentService.createAppointmentAtomic({
      patientId,
      doctorId,
      hospitalId,
      start,
      end,
      symptoms,
      symptomDuration,
      symptomSeverity,
      additionalNotes
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
