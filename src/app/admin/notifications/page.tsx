'use client';

import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminNotificationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="ADMIN" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">System Logs & Worker Job Queues</h1>

          <div className="space-y-3 text-xs">
            <Card className="p-4 bg-white border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <div>
                  <h4 className="font-bold text-slate-900">Job Worker Heartbeat</h4>
                  <p className="text-slate-500">Processed notification queues and medication reminder alerts cleanly.</p>
                </div>
              </div>
              <span className="text-slate-400">Just now</span>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
