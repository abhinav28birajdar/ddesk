import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Last updated: August 2026</p>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-4 leading-relaxed">
          <h2 className="text-sm font-bold text-slate-900">1. Information We Collect</h2>
          <p>Ddesk collects personal details, appointment schedules, and medical notes provided during booking and consultation. All data is protected using Supabase Row Level Security.</p>

          <h2 className="text-sm font-bold text-slate-900">2. How Information is Used</h2>
          <p>Your health information is used exclusively to facilitate appointment scheduling, doctor pre-visit preparations, digital prescriptions, and notification reminders.</p>

          <h2 className="text-sm font-bold text-slate-900">3. AI Processing & Third Parties</h2>
          <p>AI summaries are generated through encrypted channels. AI output does not replace professional diagnosis and is not shared with unauthorized third parties.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
