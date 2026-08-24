import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
        <p className="text-xs text-slate-500">Last updated: August 2026</p>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-4 leading-relaxed">
          <h2 className="text-sm font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>By accessing Ddesk, you agree to these terms governing appointment scheduling, patient communications, and telehealth tools.</p>

          <h2 className="text-sm font-bold text-slate-900">2. Medical Disclaimer</h2>
          <p>Ddesk is an appointment management platform. AI summaries are informational tools and do not constitute professional medical advice, diagnosis, or emergency response services.</p>

          <h2 className="text-sm font-bold text-slate-900">3. Appointments & Cancellations</h2>
          <p>Patients and doctors agree to comply with slot cancellation rules. Cancellations triggered by doctor leaves will provide automatic rescheduling assistance.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
