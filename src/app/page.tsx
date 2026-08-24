'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Stethoscope,
  Building2,
  Calendar,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Heart,
  Users,
  Star,
  Activity
} from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { DoctorCard } from '@/components/doctor/DoctorCard';
import { HospitalCard } from '@/components/hospital/HospitalCard';
import { MOCK_SPECIALIZATIONS, MOCK_DOCTORS, MOCK_HOSPITALS } from '@/lib/supabase/mock-data';

export default function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/doctors?query=${encodeURIComponent(searchQuery)}&specialization=${selectedSpecialization}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 font-sans text-slate-900">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/80 via-white to-slate-50 pt-16 pb-20 md:pt-24 md:pb-32">
        
        {/* BACKGROUND GLOW ACCENTS */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-sky-200/40 via-teal-200/30 to-blue-200/40 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            
            <Badge variant="default" className="bg-sky-100/80 text-sky-800 border-sky-200 px-4 py-1 rounded-full text-xs font-semibold shadow-xs animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-sky-600 inline" /> Next-Gen SaaS Healthcare Platform
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Healthcare Appointments <br />
              <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
                Made Simple & Smart
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              Find top doctors, check real-time availability, describe symptoms with AI pre-visit assistance, and manage post-visit follow-ups seamlessly with Ddesk.
            </p>

            {/* SEARCH BOX CARD */}
            <div className="mt-8 pt-2">
              <form
                onSubmit={handleSearch}
                className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 max-w-4xl mx-auto backdrop-blur-xl"
              >
                <div className="relative flex-1 flex items-center">
                  <Search className="absolute left-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search doctor, hospital, or symptom..."
                    className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="relative md:w-56 flex items-center">
                  <Stethoscope className="absolute left-3.5 h-5 w-5 text-slate-400" />
                  <select
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-700 font-medium appearance-none cursor-pointer"
                  >
                    <option value="">All Specializations</option>
                    {MOCK_SPECIALIZATIONS.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Button type="submit" size="lg" className="md:w-auto px-8 gap-2 font-bold text-base shadow-md">
                  <Search className="h-4 w-4" /> Find Doctor
                </Button>
              </form>
            </div>

            {/* TRUST STATS */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% Real-Time Availability
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sky-500" /> Verified Doctors & Clinics
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" /> AI Symptom Analysis
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* SPECIALIZATIONS GRID */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Badge variant="default" className="mb-2">Medical Specialties</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore by Specialization
              </h2>
            </div>
            <Link href="/specializations">
              <Button variant="ghost" className="gap-1.5 text-sky-600 font-bold hover:text-sky-700">
                View All 15 Specializations <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {MOCK_SPECIALIZATIONS.slice(0, 12).map((spec) => (
              <Link
                key={spec.id}
                href={`/doctors?specialization=${spec.id}`}
                className="group rounded-2xl border border-slate-200/80 p-4 text-center hover:border-sky-400 hover:shadow-md transition-all duration-200 bg-white hover:bg-sky-50/30"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-sky-700">{spec.name}</h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{spec.description}</p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="default">Seamless Workflow</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900">How Ddesk Works</h2>
            <p className="text-slate-600 text-sm">
              Connecting patients with healthcare providers through intelligent appointment scheduling and AI assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* STEP 1 */}
            <Card className="relative p-6 text-center border-slate-200 bg-white">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white font-extrabold text-xl shadow-md">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Discover & Select Slot</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Search doctors by hospital, specialization, or fee. View real-time available time slots computed dynamically.
              </p>
            </Card>

            {/* STEP 2 */}
            <Card className="relative p-6 text-center border-slate-200 bg-white">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white font-extrabold text-xl shadow-md">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Describe Symptoms & AI Summary</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Provide chief complaints. AI generates a pre-visit clinical summary for your doctor while placing a 5-minute temporary slot hold.
              </p>
            </Card>

            {/* STEP 3 */}
            <Card className="relative p-6 text-center border-slate-200 bg-white">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white font-extrabold text-xl shadow-md">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Consultation & Patient Summary</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Receive Google Calendar syncs, consultation notes, structured digital prescriptions, and patient-friendly AI post-visit summaries.
              </p>
            </Card>

          </div>

        </div>
      </section>

      {/* FEATURED DOCTORS */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="default" className="mb-2">Top Specialists</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900">Featured Doctors</h2>
            </div>
            <Link href="/doctors">
              <Button variant="outline" size="sm">Browse All Doctors</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_DOCTORS.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED HOSPITALS */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="default" className="mb-2">Partner Facilities</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900">Hospitals & Clinics</h2>
            </div>
            <Link href="/hospitals">
              <Button variant="outline" size="sm">View All Hospitals</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_HOSPITALS.slice(0, 3).map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-sky-600 via-teal-600 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Simplify Your Healthcare Experience?</h2>
          <p className="text-sky-100 max-w-xl mx-auto text-sm sm:text-base">
            Book appointments instantly, stay on top of medication schedules, and get intelligent clinical summaries.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/doctors">
              <Button size="lg" className="bg-white text-sky-700 hover:bg-sky-50 font-bold px-8">
                Book an Appointment
              </Button>
            </Link>
            <Link href="/auth/doctor/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8">
                Join Ddesk as Doctor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
