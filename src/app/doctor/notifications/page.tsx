'use client';

import React from 'react';
import { Bell, Calendar, User } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Card } from '@/components/ui/Card';

export default function DoctorNotificationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="DOCTOR" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          <h1 className="text-2xl font-black text-slate-900">Doctor Notifications</h1>
          
          <Card className="p-4 bg-white border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">New Appointment Booked</h4>
                <p className="text-slate-500">John Miller booked for tomorrow at 10:00 AM.</p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
