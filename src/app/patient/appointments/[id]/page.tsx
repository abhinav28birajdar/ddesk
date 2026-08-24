'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Building2,
  Stethoscope,
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { PreVisitSummaryCard } from '@/components/booking/PreVisitSummaryCard';
import { PostVisitSummaryCard } from '@/components/patient/PostVisitSummaryCard';
import { MOCK_APPOINTMENTS } from '@/lib/supabase/mock-data';

export default function PatientAppointmentDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const appointment = MOCK_APPOINTMENTS.find((a) => a.id === id) || MOCK_APPOINTMENTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="PATIENT" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          
          <Link href="/patient/appointments" className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700">
            <ArrowLeft className="h-4 w-4" /> Back to My Appointments
          </Link>

          {/* APPOINTMENT OVERVIEW HEADER */}
          <Card className="p-6 bg-white border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={appointment.status === 'CONFIRMED' ? 'default' : 'success'}>
                    {appointment.status}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">ID: {appointment.id}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  Consultation with {appointment.doctor?.profile?.full_name}
                </h1>
                <p className="text-xs font-semibold text-slate-500">{appointment.doctor?.qualification}</p>
              </div>

              <div className="text-right text-xs">
                <span className="text-slate-400 block">Consultation Date & Time</span>
                <span className="font-bold text-sky-700 text-sm">{new Date(appointment.appointment_start).toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block font-bold uppercase">Hospital Facility</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Building2 className="h-4 w-4 text-slate-400" /> {appointment.hospital?.name}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold uppercase">Specialization</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Stethoscope className="h-4 w-4 text-sky-500" /> {appointment.doctor?.specialization?.name}
                </span>
              </div>
            </div>
          </Card>

          {/* REPORTED SYMPTOMS */}
          <Card className="p-6 bg-white border border-slate-200 space-y-2 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Submitted Symptoms</h3>
            <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-medium">
              "{appointment.symptoms}"
            </p>
            <div className="flex gap-4 text-slate-500 pt-1">
              <span>Duration: <strong>{appointment.symptom_duration || 'Not specified'}</strong></span>
              <span>Severity: <strong>{appointment.symptom_severity || 'Moderate'}</strong></span>
            </div>
          </Card>

          {/* AI PRE-VISIT SUMMARY */}
          {appointment.pre_visit_summary && (
            <PreVisitSummaryCard summary={appointment.pre_visit_summary} />
          )}

          {/* DOCTOR CONSULTATION & AI POST-VISIT SUMMARY */}
          {appointment.status === 'COMPLETED' && appointment.post_visit_summary && (
            <div className="space-y-6">
              <Card className="p-6 bg-white border border-slate-200 space-y-3 text-xs">
                <h3 className="text-sm font-bold text-slate-900">Doctor's Clinical Notes</h3>
                <p className="text-slate-800 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 font-medium">
                  {appointment.consultation_notes}
                </p>
                <div>
                  <span className="font-bold text-slate-500">Official Diagnosis: </span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{appointment.diagnosis}</span>
                </div>
              </Card>

              <PostVisitSummaryCard summary={appointment.post_visit_summary} />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
