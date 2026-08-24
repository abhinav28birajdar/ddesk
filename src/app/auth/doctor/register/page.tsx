'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Stethoscope, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MOCK_SPECIALIZATIONS, MOCK_HOSPITALS } from '@/lib/supabase/mock-data';

export default function DoctorRegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/auth/doctor/pending-approval');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50 p-4 font-sans py-12">
      <Card className="w-full max-w-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-2xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Stethoscope className="h-5 w-5" />
            </div>
            Ddesk<span className="text-slate-900">.</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Doctor Registration & Verification</h1>
          <p className="text-xs text-slate-500">Apply to list your practice & manage appointments on Ddesk</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name (with Title) *</label>
              <input required type="text" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="Dr. Sarah Jenkins" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Medical Registration Number *</label>
              <input required type="text" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="MD-889021" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
              <input required type="email" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="sarah@hospital.org" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
              <input required type="tel" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="+1 (555) 234-5678" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Specialization *</label>
              <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
                {MOCK_SPECIALIZATIONS.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Years of Experience</label>
              <input type="number" defaultValue="10" min="0" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Consultation Fee ($)</label>
              <input type="number" defaultValue="150" min="0" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Qualifications / Degrees</label>
              <input type="text" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="MD, FACC - Harvard Medical" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Hospital / Clinic</label>
              <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
                {MOCK_HOSPITALS.map((h) => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <input required type="password" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="••••••••" />
          </div>

          <Button type="submit" className="w-full py-3 font-bold gap-2 text-sm shadow-md bg-emerald-600 hover:bg-emerald-700 mt-4">
            Submit Application for Approval <ArrowRight className="h-4 w-4" />
          </Button>

        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already verified?{' '}
          <Link href="/auth/doctor/login" className="font-bold text-emerald-600 hover:text-emerald-700">
            Doctor Login
          </Link>
        </div>

      </Card>
    </div>
  );
}
