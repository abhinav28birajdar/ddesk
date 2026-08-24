'use client';

import React, { useState } from 'react';
import { CalendarOff, AlertTriangle, CheckCircle2, Send, Clock } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { LeaveService } from '@/services/leave.service';
import { MOCK_DOCTORS, MOCK_LEAVES } from '@/lib/supabase/mock-data';
import { DoctorLeave, Appointment } from '@/types';

export default function DoctorLeavePage() {
  const doctor = MOCK_DOCTORS[0];
  const [leaves, setLeaves] = useState<DoctorLeave[]>(MOCK_LEAVES);

  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-09-03');
  const [reason, setReason] = useState('Attending Cardiology Medical Conference');
  
  const [conflictResult, setConflictResult] = useState<{
    submitted: boolean;
    affected: Appointment[];
  } | null>(null);

  const handleSubmitLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await LeaveService.submitLeave({
      doctorId: doctor.id,
      startDate,
      endDate,
      reason
    });

    if (res.leave) {
      setLeaves([res.leave, ...leaves]);
    }
    setConflictResult({
      submitted: true,
      affected: res.affectedAppointments
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="DOCTOR" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Doctor Leave Management</h1>
            <p className="text-xs text-slate-500">Submit leave date ranges. Conflicting patient appointments will be updated to NEEDS_RESCHEDULE with automatic alerts.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* SUBMIT LEAVE FORM */}
            <Card className="p-6 bg-white border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CalendarOff className="h-4 w-4 text-amber-600" /> Apply New Leave
              </h3>

              <form onSubmit={handleSubmitLeave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    required
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    required
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reason for Leave</label>
                  <textarea
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Conference, Medical emergency..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                  />
                </div>

                <Button type="submit" className="w-full font-bold gap-2 bg-amber-600 hover:bg-amber-700 text-white">
                  <Send className="h-4 w-4" /> Submit Leave Request
                </Button>
              </form>
            </Card>

            {/* CONFLICT DETECTION & LEAVE HISTORY */}
            <div className="lg:col-span-2 space-y-6">
              
              {conflictResult && conflictResult.submitted && (
                <Card className="p-5 border border-amber-200 bg-amber-50/60 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <span>Leave Submitted — Conflict Analysis Triggered</span>
                  </div>
                  
                  {conflictResult.affected.length > 0 ? (
                    <div className="space-y-2 text-xs text-amber-950">
                      <p className="font-semibold">
                        {conflictResult.affected.length} existing appointment(s) fall within this leave range:
                      </p>
                      <ul className="space-y-1">
                        {conflictResult.affected.map((apt) => (
                          <li key={apt.id} className="bg-white p-2 rounded-lg border border-amber-200 flex items-center justify-between">
                            <span>{apt.patient?.full_name} ({new Date(apt.appointment_start).toLocaleString()})</span>
                            <Badge variant="warning">NEEDS_RESCHEDULE</Badge>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[11px] text-amber-800 italic">
                        Notification jobs & email rescheduling requests have been queued for all affected patients.
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-amber-900">
                      Zero conflicting appointments detected for this leave range.
                    </p>
                  )}
                </Card>
              )}

              {/* LEAVES LIST */}
              <Card className="p-6 bg-white border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Leave History</h3>
                <div className="space-y-3 text-xs">
                  {leaves.map((l) => (
                    <div key={l.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">
                          {l.start_date} to {l.end_date}
                        </span>
                        <span className="text-slate-500">{l.reason}</span>
                      </div>
                      <Badge variant="success">{l.status}</Badge>
                    </div>
                  ))}
                </div>
              </Card>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
