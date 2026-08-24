import { NextResponse } from 'next/server';
import { JobRunnerService } from '@/services/job-runner.service';

export async function GET(request: Request) {
  try {
    const result = await JobRunnerService.processPendingJobs();
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
