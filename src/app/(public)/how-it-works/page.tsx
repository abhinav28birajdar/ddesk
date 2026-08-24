import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Search, Calendar, Sparkles, FileText, Bell, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-12 space-y-12">
        <div className="text-center space-y-2">
          <Badge variant="default">Platform Architecture</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900">How Ddesk Works</h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            A comprehensive overview of our appointment workflow for Patients and Doctors.
          </p>
        </div>

        {/* FOR PATIENTS */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2">For Patients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 border-slate-200">
              <span className="font-bold text-sky-600 text-xs">Step 1</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1">Search & Filter</h3>
              <p className="text-xs text-slate-500 mt-1">Search by specialization, hospital location, fee, or doctor name.</p>
            </Card>
            <Card className="p-5 border-slate-200">
              <span className="font-bold text-sky-600 text-xs">Step 2</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1">Choose Available Slot</h3>
              <p className="text-xs text-slate-500 mt-1">Real-time availability prevents double booking.</p>
            </Card>
            <Card className="p-5 border-slate-200">
              <span className="font-bold text-sky-600 text-xs">Step 3</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1">Describe Symptoms</h3>
              <p className="text-xs text-slate-500 mt-1">Provide chief complaints for AI pre-visit summary generation.</p>
            </Card>
            <Card className="p-5 border-slate-200">
              <span className="font-bold text-sky-600 text-xs">Step 4</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1">Confirm & Reminders</h3>
              <p className="text-xs text-slate-500 mt-1">Google Calendar sync & medication reminder notifications.</p>
            </Card>
          </div>
        </div>

        {/* FOR DOCTORS */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2">For Doctors & Clinics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 border-slate-200">
              <span className="font-bold text-emerald-600 text-xs">Step 1</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1">Create Profile & Verification</h3>
              <p className="text-xs text-slate-500 mt-1">Submit medical registration number for admin approval.</p>
            </Card>
            <Card className="p-5 border-slate-200">
              <span className="font-bold text-emerald-600 text-xs">Step 2</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1">Set Working Availability</h3>
              <p className="text-xs text-slate-500 mt-1">Configure multi-range time slots per day with custom buffer times.</p>
            </Card>
            <Card className="p-5 border-slate-200">
              <span className="font-bold text-emerald-600 text-xs">Step 3</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1">Review AI Pre-Visit Summaries</h3>
              <p className="text-xs text-slate-500 mt-1">See chief complaints and suggested questions before patient enters.</p>
            </Card>
            <Card className="p-5 border-slate-200">
              <span className="font-bold text-emerald-600 text-xs">Step 4</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1">Consultation & Prescriptions</h3>
              <p className="text-xs text-slate-500 mt-1">Submit notes to generate patient-friendly AI post-visit summaries.</p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
