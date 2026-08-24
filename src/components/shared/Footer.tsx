import React from 'react';
import Link from 'next/link';
import { Stethoscope, Heart, Shield, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          
          {/* COL 1: BRAND */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 text-white">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-2xl">Ddesk<span className="text-sky-400">.</span></span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm">
              Smart Healthcare Appointment & Follow-up Management platform connecting patients, doctors, and clinics with real-time slot booking and AI-driven summaries.
            </p>
            <div className="flex items-center gap-4 pt-2 text-slate-400 text-sm">
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-emerald-400" /> HIPAA Compliant</span>
              <span className="flex items-center gap-1.5"><Heart className="h-4 w-4 text-rose-400" /> Patient First</span>
            </div>
          </div>

          {/* COL 2: QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Patients</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/doctors" className="hover:text-white transition-colors">Find a Doctor</Link></li>
              <li><Link href="/hospitals" className="hover:text-white transition-colors">Hospital Directory</Link></li>
              <li><Link href="/specializations" className="hover:text-white transition-colors">Specializations</Link></li>
              <li><Link href="/auth/patient/register" className="hover:text-white transition-colors">Patient Sign Up</Link></li>
              <li><Link href="/patient/appointments" className="hover:text-white transition-colors">Manage Appointments</Link></li>
            </ul>
          </div>

          {/* COL 3: FOR DOCTORS */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Doctors & Clinics</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/auth/doctor/register" className="hover:text-white transition-colors">Join as Doctor</Link></li>
              <li><Link href="/doctor/dashboard" className="hover:text-white transition-colors">Doctor Portal</Link></li>
              <li><Link href="/doctor/leave" className="hover:text-white transition-colors">Leave Management</Link></li>
              <li><Link href="/auth/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* COL 4: CONTACT */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact & Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-400" /> 100 Health Plaza, NY 10001</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-sky-400" /> +1 (800) 555-DDESK</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-sky-400" /> support@ddesk.com</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ddesk Health Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-300">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
