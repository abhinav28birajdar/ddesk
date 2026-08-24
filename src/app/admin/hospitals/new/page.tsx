'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, ArrowLeft, Save } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function NewHospitalPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: 'USA',
    postalCode: '',
    phone: '',
    email: '',
    website: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/hospitals');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="ADMIN" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          <Link href="/admin/hospitals" className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700">
            <ArrowLeft className="h-4 w-4" /> Back to Hospitals Directory
          </Link>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Add New Hospital / Clinic</h1>
            <p className="text-xs text-slate-500">Register a new accredited facility on the Ddesk network</p>
          </div>

          <Card className="p-6 bg-white border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hospital Name *</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" placeholder="Saint Mary Medical Center" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" placeholder="info@saintmary.org" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="Premier multi-specialty regional hospital..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Street Address *</label>
                  <input required type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" placeholder="50 Health Blvd" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City *</label>
                  <input required type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" placeholder="Boston" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State *</label>
                  <input required type="text" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" placeholder="MA" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" placeholder="+1 (617) 555-0100" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Website URL</label>
                  <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" placeholder="https://saintmary.example.com" />
                </div>
              </div>

              <Button type="submit" className="font-bold gap-2 shadow-sm mt-4">
                <Save className="h-4 w-4" /> Save & Register Hospital
              </Button>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
}
