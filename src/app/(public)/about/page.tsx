import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-12 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="default">About Ddesk</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900">Transforming Healthcare Management</h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Ddesk connects patients, doctors, and hospitals with intelligent scheduling, double-booking prevention, and AI-driven clinical summaries.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
          <p>
            Ddesk was engineered to solve the friction in healthcare scheduling. From long waiting times to missing follow-up notes, Ddesk streamlines every step of the patient-doctor journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <ShieldCheck className="h-5 w-5 text-sky-600" />
              <h3 className="font-bold text-slate-900 text-sm">Patient Security</h3>
              <p className="text-xs text-slate-500">Supabase RLS database encryption for health records.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <Sparkles className="h-5 w-5 text-teal-600" />
              <h3 className="font-bold text-slate-900 text-sm">AI Assistance</h3>
              <p className="text-xs text-slate-500">Structured pre-visit and patient-friendly summaries.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <Heart className="h-5 w-5 text-rose-500" />
              <h3 className="font-bold text-slate-900 text-sm">Patient First</h3>
              <p className="text-xs text-slate-500">Google Calendar sync & medication reminder alerts.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
