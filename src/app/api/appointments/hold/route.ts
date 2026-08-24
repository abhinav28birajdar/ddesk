import { NextResponse } from 'next/server';
import { AppointmentService } from '@/services/appointment.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { doctorId, patientId, hospitalId, start, end } = body;

    if (!doctorId || !patientId || !start || !end) {
      return NextResponse.json(
        { success: false, message: 'Missing required parameters.' },
        { status: 400 }
      );
    }

    const result = await AppointmentService.createHold({
      doctorId,
      patientId,
      hospitalId,
      start,
      end
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
