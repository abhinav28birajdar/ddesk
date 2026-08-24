'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Pill,
  Bell,
  User,
  PlusCircle,
  FileText,
  CheckCircle2,
  Stethoscope,
  Building2,
  ChevronRight
} from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { MOCK_APPOINTMENTS, MOCK_NOTIFICATIONS } from '@/lib/supabase/mock-data';

export default function PatientDashboardPage() {
  const upcomingApt = MOCK_APPOINTMENTS.find((a) => a.status === 'CONFIRMED') || MOCK_APPOINTMENTS[0];
  const completedApt = MOCK_APPOINTMENTS.find((a) => a.status === 'COMPLETED');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="PATIENT" unreadCount={2} />

        <main className="flex-1 p-6 md:p-8 space-y-8">
          
          {/* HEADER WELCOME */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Welcome back, John 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Here is a overview of your healthcare schedule, active medications, & AI summaries.
              </p>
            </div>
            <Link href="/doctors">
              <Button className="gap-2 font-bold shadow-sm">
                <PlusCircle className="h-4 w-4" /> Book New Appointment
              </Button>
            </Link>
          </div>

          {/* DASHBOARD METRICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Card className="p-4 bg-white border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Upcoming</span>
                <div className="h-8 w-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  <Calendar className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">1</p>
              <span className="text-[11px] text-sky-600 font-semibold">Scheduled for Tomorrow</span>
            </Card>

            <Card className="p-4 bg-white border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Completed</span>
                <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">4</p>
              <span className="text-[11px] text-slate-500 font-medium">Consultations finished</span>
            </Card>

            <Card className="p-4 bg-white border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Active Medications</span>
                <div className="h-8 w-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <Pill className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">1</p>
              <span className="text-[11px] text-rose-600 font-semibold">Hydrocortisone 1%</span>
            </Card>

            <Card className="p-4 bg-white border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Notifications</span>
                <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Bell className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">2</p>
              <span className="text-[11px] text-amber-600 font-semibold">2 Unread alerts</span>
            </Card>

          </div>

          {/* UPCOMING APPOINTMENT SPOTLIGHT */}
          {upcomingApt && (
            <Card className="p-6 border-l-4 border-l-sky-600 bg-white border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="default">Next Scheduled Consultation</Badge>
                <Badge variant="success">{upcomingApt.status}</Badge>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    {upcomingApt.doctor?.profile?.full_name} ({upcomingApt.doctor?.specialization?.name})
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    {upcomingApt.hospital?.name}
                  </p>
                  <p className="text-xs font-bold text-sky-700 flex items-center gap-1.5 pt-1">
                    <Clock className="h-3.5 w-3.5 text-sky-600" />
                    {new Date(upcomingApt.appointment_start).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/patient/appointments/${upcomingApt.id}`}>
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      View Details & AI Summary <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {/* TWO COLUMN GRID: RECENT CONSULTATION & MEDICATION REMINDERS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* RECENT COMPLETED CONSULTATION */}
            <Card className="p-6 bg-white border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" /> Recent Consultation Summary
              </h3>
              {completedApt ? (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{completedApt.doctor?.profile?.full_name}</span>
                    <span className="text-slate-400">{completedApt.diagnosis}</span>
                  </div>
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    "{completedApt.post_visit_summary?.visit_summary}"
                  </p>
                  <Link href={`/patient/appointments/${completedApt.id}`} className="text-sky-600 font-bold hover:underline block pt-1">
                    View Full Clinical Report →
                  </Link>
                </div>
              ) : (
                <p className="text-xs text-slate-500">No completed consultations yet.</p>
              )}
            </Card>

            {/* ACTIVE MEDICATION REMINDERS */}
            <Card className="p-6 bg-white border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Pill className="h-5 w-5 text-rose-500" /> Daily Medication Schedule
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Hydrocortisone 1% Cream</h4>
                    <p className="text-slate-500">Pea-sized amount • Twice daily</p>
                  </div>
                  <Badge variant="warning" className="bg-rose-100 text-rose-800 border-rose-200">
                    Next: 08:00 PM
                  </Badge>
                </div>
              </div>
            </Card>

          </div>

        </main>
      </div>
    </div>
  );
}
