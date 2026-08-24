'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Sparkles,
  AlertCircle,
  FileText,
  CalendarOff,
  CheckCircle2,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MOCK_DOCTORS, MOCK_APPOINTMENTS } from '@/lib/supabase/mock-data';

export default function DoctorDashboardPage() {
  const doctor = MOCK_DOCTORS[0];
  const nextApt = MOCK_APPOINTMENTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="DOCTOR" />

        <main className="flex-1 p-6 md:p-8 space-y-8">
          
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {doctor.profile?.full_name}
                </h1>
                <Badge variant="success">APPROVED</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {doctor.specialization?.name} • Reg No: {doctor.medical_registration_number}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/doctor/leave">
                <Button variant="outline" size="sm" className="gap-1.5 font-bold text-xs">
                  <CalendarOff className="h-4 w-4 text-amber-600" /> Apply Leave
                </Button>
              </Link>
              <Link href="/doctor/profile">
                <Button size="sm" className="gap-1.5 font-bold text-xs bg-emerald-600 hover:bg-emerald-700">
                  <Stethoscope className="h-4 w-4" /> Availability Settings
                </Button>
              </Link>
            </div>
          </div>

          {/* METRICS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-white border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase">Today's Schedule</span>
              <p className="text-2xl font-black text-slate-900 mt-1">1</p>
              <span className="text-[11px] text-sky-600 font-semibold">1 Confirmed Patient</span>
            </Card>

            <Card className="p-4 bg-white border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase">Patients This Month</span>
              <p className="text-2xl font-black text-slate-900 mt-1">28</p>
              <span className="text-[11px] text-emerald-600 font-semibold">+14% vs last month</span>
            </Card>

            <Card className="p-4 bg-white border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase">Pending Consultation Notes</span>
              <p className="text-2xl font-black text-slate-900 mt-1">0</p>
              <span className="text-[11px] text-slate-500">All reports updated</span>
            </Card>

            <Card className="p-4 bg-white border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase">Upcoming Leave</span>
              <p className="text-2xl font-black text-slate-900 mt-1">3 Days</p>
              <span className="text-[11px] text-amber-600 font-semibold">Sep 1 - Sep 3</span>
            </Card>
          </div>

          {/* NEXT PATIENT SPOTLIGHT WIDGET */}
          {nextApt && (
            <Card className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
                    Next Patient Spotlight
                  </span>
                </div>
                <Badge variant="warning" className="bg-amber-400 text-slate-950 font-bold border-none">
                  {nextApt.pre_visit_summary?.urgency_level || 'Medium'} Urgency
                </Badge>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-white">{nextApt.patient?.full_name}</h3>
                  <p className="text-xs text-sky-200 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-sky-400" />
                    {new Date(nextApt.appointment_start).toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-300">
                    Chief Complaint: <strong className="text-white">"{nextApt.symptoms}"</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/doctor/appointments/${nextApt.id}/consultation`}>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold gap-2 text-xs">
                      <FileText className="h-4 w-4" /> Start Consultation & AI Notes
                    </Button>
                  </Link>
                </div>
              </div>

              {/* AI SUGGESTED QUESTIONS PREVIEW */}
              {nextApt.pre_visit_summary?.suggested_questions && (
                <div className="pt-3 border-t border-slate-700/80 text-xs space-y-1.5">
                  <span className="text-sky-300 font-bold">Suggested Clinical Questions to Consider:</span>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {nextApt.pre_visit_summary.suggested_questions.map((q, i) => (
                      <li key={i} className="bg-slate-800/80 p-2 rounded-lg border border-slate-700 text-[11px] text-slate-200">
                        {i + 1}. {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          )}

          {/* TODAY'S APPOINTMENTS TIMELINE TABLE */}
          <Card className="p-6 bg-white border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sky-600" /> Today's Appointment Schedule
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="pb-3">Time</th>
                    <th className="pb-3">Patient</th>
                    <th className="pb-3">Chief Complaint</th>
                    <th className="pb-3">Urgency</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {MOCK_APPOINTMENTS.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50">
                      <td className="py-3 font-bold text-sky-700">
                        {new Date(apt.appointment_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 font-bold text-slate-900">{apt.patient?.full_name}</td>
                      <td className="py-3 max-w-xs truncate text-slate-600">{apt.symptoms}</td>
                      <td className="py-3">
                        <Badge variant={apt.pre_visit_summary?.urgency_level === 'High' ? 'destructive' : 'warning'}>
                          {apt.pre_visit_summary?.urgency_level || 'Medium'}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge variant={apt.status === 'CONFIRMED' ? 'default' : 'success'}>
                          {apt.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-right">
                        <Link href={`/doctor/appointments/${apt.id}/consultation`}>
                          <Button variant="outline" size="sm" className="text-xs">
                            Consult <ChevronRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </main>
      </div>
    </div>
  );
}
