'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { HospitalCard } from '@/components/hospital/HospitalCard';
import { Badge } from '@/components/ui/Badge';
import { Search, Building2 } from 'lucide-react';
import { MOCK_HOSPITALS } from '@/lib/supabase/mock-data';

export default function HospitalDirectoryPage() {
  const [query, setQuery] = useState('');

  const filteredHospitals = MOCK_HOSPITALS.filter(
    (h) =>
      h.name.toLowerCase().includes(query.toLowerCase()) ||
      h.city.toLowerCase().includes(query.toLowerCase()) ||
      h.description?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* PAGE HEADER */}
        <div className="space-y-2">
          <Badge variant="default">Partner Facilities</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hospital & Clinic Directory
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl">
            Explore accredited medical institutions, emergency centers, and specialized healthcare clinics connected to Ddesk.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hospital name or city..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
          />
        </div>

        {/* HOSPITALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
