'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Plus, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MOCK_HOSPITALS } from '@/lib/supabase/mock-data';

export default function AdminHospitalsPage() {
  const [hospitals, setHospitals] = useState(MOCK_HOSPITALS);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="ADMIN" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Hospital & Clinic Management</h1>
              <p className="text-xs text-slate-500 mt-1">Manage accredited healthcare facilities, addresses, & department listings</p>
            </div>
            <Link href="/admin/hospitals/new">
              <Button size="sm" className="font-bold gap-1.5">
                <Plus className="h-4 w-4" /> Add New Hospital
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {hospitals.map((h) => (
              <Card key={h.id} className="p-6 bg-white border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{h.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" /> {h.address}, {h.city}, {h.state}
                      </p>
                    </div>
                  </div>
                  <Badge variant={h.is_active ? 'success' : 'secondary'}>
                    {h.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-slate-400" /> {h.phone}</div>
                  <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-400" /> {h.email}</div>
                </div>
              </Card>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
