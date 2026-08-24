'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle2, Calendar, Pill, ShieldAlert } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MOCK_NOTIFICATIONS } from '@/lib/supabase/mock-data';
import { NotificationItem } from '@/types';

export default function PatientNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="PATIENT" unreadCount={notifications.filter((n) => !n.is_read).length} />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Notifications & Alerts</h1>
              <p className="text-xs text-slate-500 mt-1">Appointment confirmations, reminders, & doctor updates</p>
            </div>
            <Button variant="outline" size="sm" onClick={markAllRead}>Mark All as Read</Button>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <Card
                key={n.id}
                className={`p-4 border transition-all ${
                  n.is_read ? 'bg-white border-slate-200' : 'bg-sky-50/50 border-sky-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold shrink-0">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                      <span className="text-[11px] text-slate-400">{new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
