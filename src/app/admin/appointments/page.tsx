'use client';

import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MOCK_APPOINTMENTS } from '@/lib/supabase/mock-data';

export default function AdminAppointmentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="ADMIN" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">System Appointment Auditing</h1>

          <Card className="p-6 bg-white border border-slate-200">
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="pb-3">Appointment ID</th>
                    <th className="pb-3">Patient</th>
                    <th className="pb-3">Doctor</th>
                    <th className="pb-3">Hospital</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {MOCK_APPOINTMENTS.map((apt) => (
                    <tr key={apt.id}>
                      <td className="py-3 font-mono text-sky-700">{apt.id}</td>
                      <td className="py-3 font-bold text-slate-900">{apt.patient?.full_name}</td>
                      <td className="py-3">{apt.doctor?.profile?.full_name}</td>
                      <td className="py-3 text-slate-500">{apt.hospital?.name}</td>
                      <td className="py-3">{new Date(apt.appointment_start).toLocaleDateString()}</td>
                      <td className="py-3"><Badge variant="default">{apt.status}</Badge></td>
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
