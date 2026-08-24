'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Stethoscope, Building2, ChevronRight, FileText } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MOCK_APPOINTMENTS } from '@/lib/supabase/mock-data';

export default function PatientAppointmentsPage() {
  const [filter, setFilter] = useState<'ALL' | 'CONFIRMED' | 'COMPLETED'>('ALL');

  const appointments = MOCK_APPOINTMENTS.filter((a) => {
    if (filter === 'CONFIRMED') return a.status === 'CONFIRMED';
    if (filter === 'COMPLETED') return a.status === 'COMPLETED';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="PATIENT" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Appointments</h1>
              <p className="text-xs text-slate-500 mt-1">View upcoming appointments, clinical notes, & digital prescriptions</p>
            </div>
            <Link href="/doctors">
              <Button size="sm" className="font-bold">Book New Appointment</Button>
            </Link>
          </div>

          {/* FILTER TABS */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg ${filter === 'ALL' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              All Appointments
            </button>
            <button
              onClick={() => setFilter('CONFIRMED')}
              className={`px-3 py-1.5 rounded-lg ${filter === 'CONFIRMED' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('COMPLETED')}
              className={`px-3 py-1.5 rounded-lg ${filter === 'COMPLETED' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Completed
            </button>
          </div>

          {/* APPOINTMENT LIST */}
          <div className="space-y-4">
            {appointments.map((apt) => (
              <Card key={apt.id} className="p-6 bg-white border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        {apt.doctor?.profile?.full_name}
                      </h3>
                      <p className="text-xs text-slate-500">{apt.doctor?.specialization?.name}</p>
                    </div>
                  </div>
                  <Badge variant={apt.status === 'CONFIRMED' ? 'default' : 'success'}>
                    {apt.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    <span>{apt.hospital?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-sky-600 font-bold" />
                    <span className="font-bold text-slate-800">{new Date(apt.appointment_start).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">Symptoms: <strong className="text-slate-800">{apt.symptoms.slice(0, 40)}...</strong></span>
                  <Link href={`/patient/appointments/${apt.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      View Full Details <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
