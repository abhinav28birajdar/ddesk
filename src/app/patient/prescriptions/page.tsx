'use client';

import React from 'react';
import { Pill, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';

export default function PatientPrescriptionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="PATIENT" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Active Prescriptions</h1>
            <p className="text-xs text-slate-500">Manage digital prescriptions and automated medication reminder schedules</p>
          </div>

          <Card className="p-6 bg-white border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Prescription Rx-88190</h3>
                <p className="text-xs text-slate-500">Issued by Dr. Robert Chen (Atopic Dermatitis)</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Hydrocortisone 1% Cream</span>
                <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Twice Daily</span>
              </div>
              <p className="text-slate-600">Pea-sized amount applied topically to elbows for 7 days.</p>
              
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-sky-600" /> Scheduled Reminders: 08:00 AM, 08:00 PM</span>
                <span>Duration: 7 Days</span>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
