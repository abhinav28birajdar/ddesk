'use client';

import React from 'react';
import Link from 'next/link';
import { Stethoscope, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { MOCK_SPECIALIZATIONS } from '@/lib/supabase/mock-data';

export default function SpecializationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <Badge variant="default">Medical Specialties</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Browse All Specializations
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl">
            Find doctors specialized in cardiology, dermatology, pediatrics, neurology, orthopedics, and 10+ other clinical branches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SPECIALIZATIONS.map((spec) => (
            <Card key={spec.id} className="p-6 hover:shadow-md hover:border-sky-300 transition-all border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold shrink-0">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">{spec.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{spec.description}</p>
                  <Link
                    href={`/doctors?specialization=${spec.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 pt-2"
                  >
                    View Doctors <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
