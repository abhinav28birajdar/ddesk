'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Stethoscope,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { MOCK_DOCTORS, MOCK_HOSPITALS, MOCK_APPOINTMENTS } from '@/lib/supabase/mock-data';

export default function AdminDashboardPage() {
  const chartDataAppointments = [
    { day: 'Mon', appointments: 12 },
    { day: 'Tue', appointments: 19 },
    { day: 'Wed', appointments: 15 },
    { day: 'Thu', appointments: 22 },
    { day: 'Fri', appointments: 28 },
    { day: 'Sat', appointments: 14 },
    { day: 'Sun', appointments: 8 }
  ];

  const chartDataStatus = [
    { name: 'Confirmed', value: 45, color: '#0284c7' },
    { name: 'Completed', value: 85, color: '#059669' },
    { name: 'Needs Reschedule', value: 6, color: '#d97706' },
    { name: 'Cancelled', value: 4, color: '#dc2626' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="ADMIN" />

        <main className="flex-1 p-6 md:p-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Platform Analytics Dashboard
                </h1>
                <Badge variant="warning">ADMIN CONSOLE</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Real-time metrics, doctor approval queues, hospital management, & system health logs.
              </p>
            </div>

            <div className="flex gap-2">
              <Link href="/admin/hospitals/new">
                <Button size="sm" className="font-bold gap-1 text-xs">
                  <Building2 className="h-4 w-4" /> Add Hospital
                </Button>
              </Link>
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Card className="p-4 bg-white border border-slate-200">
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
                <span>Total Patients</span>
                <Users className="h-4 w-4 text-sky-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 mt-1">1,420</p>
              <span className="text-[11px] text-emerald-600 font-semibold">↑ 12% this week</span>
            </Card>

            <Card className="p-4 bg-white border border-slate-200">
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
                <span>Active Doctors</span>
                <Stethoscope className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 mt-1">30</p>
              <span className="text-[11px] text-amber-600 font-semibold">1 Pending Approval</span>
            </Card>

            <Card className="p-4 bg-white border border-slate-200">
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
                <span>Hospitals / Clinics</span>
                <Building2 className="h-4 w-4 text-teal-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 mt-1">10</p>
              <span className="text-[11px] text-slate-500">Across 8 states</span>
            </Card>

            <Card className="p-4 bg-white border border-slate-200">
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
                <span>System Failures</span>
                <AlertTriangle className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-black text-slate-900 mt-1">0</p>
              <span className="text-[11px] text-emerald-600 font-semibold">100% Retry Worker Health</span>
            </Card>

          </div>

          {/* ANALYTICS CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* APPOINTMENTS OVER TIME */}
            <Card className="lg:col-span-2 p-6 bg-white border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Appointments Over Time</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartDataAppointments}>
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="#0284c7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* STATUS BREAKDOWN */}
            <Card className="p-6 bg-white border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Appointment Status Distribution</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartDataStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {chartDataStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

          </div>

          {/* PENDING DOCTOR APPROVALS QUEUE */}
          <Card className="p-6 bg-white border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" /> Pending Doctor Approvals
              </h3>
              <Link href="/admin/doctors">
                <Button variant="ghost" size="sm" className="text-xs text-sky-600 font-bold">
                  View All Doctors →
                </Button>
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Dr. Marcus Vance</h4>
                  <p className="text-slate-600">Specialization: Neurologist • Reg No: MD-994012 • Stanford Medicine</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="/admin/doctors">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
                      Approve Doctor
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

        </main>
      </div>
    </div>
  );
}
