'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Stethoscope, Building2, MapPin, DollarSign, Calendar } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { DoctorCard } from '@/components/doctor/DoctorCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_DOCTORS, MOCK_SPECIALIZATIONS, MOCK_HOSPITALS } from '@/lib/supabase/mock-data';

export default function DoctorDirectoryPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const initialSpec = searchParams.get('specialization') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedSpec, setSelectedSpec] = useState(initialSpec);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [maxFee, setMaxFee] = useState<number>(300);

  const filteredDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter((doc) => {
      const matchQuery =
        !query ||
        doc.profile?.full_name.toLowerCase().includes(query.toLowerCase()) ||
        doc.specialization?.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.bio?.toLowerCase().includes(query.toLowerCase());

      const matchSpec = !selectedSpec || doc.specialization_id === selectedSpec;

      const matchHospital =
        !selectedHospital ||
        doc.hospitals?.some((h) => h.id === selectedHospital);

      const matchFee = doc.consultation_fee <= maxFee;

      return matchQuery && matchSpec && matchHospital && matchFee;
    });
  }, [query, selectedSpec, selectedHospital, maxFee]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* PAGE HEADER */}
        <div className="space-y-2">
          <Badge variant="default">Doctor Discovery</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find Top Healthcare Specialists
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl">
            Filter doctors by specialization, hospital association, consultation fee, and real-time appointment availability.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* NAME / SYMPTOM QUERY */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by doctor name or condition..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* SPECIALIZATION */}
            <div className="relative">
              <select
                value={selectedSpec}
                onChange={(e) => setSelectedSpec(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 font-medium"
              >
                <option value="">All Specializations</option>
                {MOCK_SPECIALIZATIONS.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>

            {/* HOSPITAL */}
            <div className="relative">
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 font-medium"
              >
                <option value="">All Hospitals & Clinics</option>
                {MOCK_HOSPITALS.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* MAX FEE SLIDER */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-slate-700">Max Consultation Fee: ${maxFee}</span>
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              value={maxFee}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              className="w-48 accent-sky-600 cursor-pointer"
            />
          </div>
        </div>

        {/* RESULTS GRID */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing <strong>{filteredDoctors.length}</strong> available doctors</span>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
              <Stethoscope className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Doctors Match Your Filters</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try resetting your specialization or fee range to view all available medical specialists.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setQuery('');
                  setSelectedSpec('');
                  setSelectedHospital('');
                  setMaxFee(300);
                }}
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
