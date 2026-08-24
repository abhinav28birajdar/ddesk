'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  User,
  Bell,
  Pill,
  Clock,
  FileText,
  Building2,
  Users,
  ShieldCheck,
  CalendarOff,
  Settings,
  LogOut
} from 'lucide-react';
import { UserRole } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface AppSidebarProps {
  role: UserRole;
  unreadCount?: number;
}

interface SidebarItem {
  href: string;
  label: string;
  icon: any;
  badge?: number;
}

export function AppSidebar({ role, unreadCount = 2 }: AppSidebarProps) {
  const pathname = usePathname();

  const patientLinks: SidebarItem[] = [
    { href: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/patient/appointments', label: 'Appointments', icon: Calendar },
    { href: '/patient/prescriptions', label: 'Prescriptions', icon: Pill },
    { href: '/patient/notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { href: '/patient/profile', label: 'My Profile', icon: User }
  ];

  const doctorLinks: SidebarItem[] = [
    { href: '/doctor/dashboard', label: 'Schedule & Today', icon: LayoutDashboard },
    { href: '/doctor/leave', label: 'Leave Management', icon: CalendarOff },
    { href: '/doctor/notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { href: '/doctor/profile', label: 'Professional Profile', icon: User }
  ];

  const adminLinks: SidebarItem[] = [
    { href: '/admin/dashboard', label: 'Analytics Dashboard', icon: LayoutDashboard },
    { href: '/admin/doctors', label: 'Doctor Approvals', icon: Users },
    { href: '/admin/hospitals', label: 'Hospitals & Clinics', icon: Building2 },
    { href: '/admin/appointments', label: 'All Appointments', icon: Calendar },
    { href: '/admin/notifications', label: 'System Logs', icon: Bell }
  ];

  const links = role === 'PATIENT' ? patientLinks : role === 'DOCTOR' ? doctorLinks : adminLinks;

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div className="space-y-6">
        
        {/* PORTAL TITLE BADGE */}
        <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {role} PORTAL
          </span>
          <Badge variant={role === 'DOCTOR' ? 'success' : role === 'ADMIN' ? 'warning' : 'default'}>
            Active
          </Badge>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && link.badge > 0 ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-[11px] font-bold text-white">
                    {link.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

      </div>

      {/* FOOTER USER SUMMARY */}
      <div className="pt-4 border-t border-slate-100">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900">
          <LogOut className="h-4 w-4 text-slate-400" /> Back to Main Site
        </Link>
      </div>
    </aside>
  );
}
