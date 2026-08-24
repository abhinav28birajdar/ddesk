'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Building2, Stethoscope, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { DoctorCard } from '@/components/doctor/DoctorCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { MOCK_HOSPITALS, MOCK_DOCTORS } from '@/lib/supabase/mock-data';

export default function HospitalDetailPage({
  params
}: {
  params: Promise<{ hospitalId: string }>;
}) {
  const { hospitalId } = use(params);
  const hospital = MOCK_HOSPITALS.find((h) => h.id === hospitalId) || MOCK_HOSPITALS[0];

  const associatedDoctors = MOCK_DOCTORS.filter((d) =>
    d.hospitals?.some((h) => h.id === hospital.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        <Link href="/hospitals" className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700">
          <ArrowLeft className="h-4 w-4" /> Back to Hospital Directory
        </Link>

        {/* HERO HOSPITAL HEADER */}
        <Card className="overflow-hidden border border-slate-200 bg-white">
          <div className="relative h-64 w-full bg-slate-800">
            <img
              src={hospital.cover_image_url || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000'}
              alt={hospital.name}
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <Badge variant="default" className="bg-sky-500 text-white border-none">
                Accredited Healthcare Facility
              </Badge>
              <h1 className="text-3xl font-extrabold">{hospital.name}</h1>
              <p className="text-xs text-slate-200 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-sky-400" />
                {hospital.address}, {hospital.city}, {hospital.state} {hospital.postal_code}
              </p>
            </div>
          </div>

          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-base font-bold text-slate-900">About the Hospital</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{hospital.description}</p>
            </div>

            <div className="space-y-2 border-l border-slate-100 pl-6 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 mb-2">Direct Contact</h4>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-sky-600" /> {hospital.phone}</div>
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-sky-600" /> {hospital.email}</div>
              <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5 text-sky-600" /> {hospital.website}</div>
            </div>
          </CardContent>
        </Card>

        {/* ASSOCIATED DOCTORS ROSTER */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="default">Medical Staff</Badge>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Doctors at {hospital.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {associatedDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
