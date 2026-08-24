'use client';

import React, { useState } from 'react';
import { User, ShieldCheck, Heart, Bell, Calendar, Save, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function PatientProfilePage() {
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    fullName: 'John Miller',
    email: 'john.miller@example.com',
    phone: '+1 (555) 987-6543',
    dob: '1992-06-15',
    gender: 'Male',
    bloodGroup: 'O+',
    allergies: 'Penicillin, Dust',
    conditions: 'Mild Hypertension',
    emergencyName: 'Mary Miller (Spouse)',
    emergencyPhone: '+1 (555) 111-2222',
    emailNotifs: true,
    medReminders: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="PATIENT" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Patient Profile & Settings</h1>
              <p className="text-xs text-slate-500 mt-1">Manage personal health records, emergency contacts, & notification settings</p>
            </div>
            {saved && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="h-4 w-4" /> Changes Saved
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6 text-xs">
            
            {/* PERSONAL DETAILS */}
            <Card className="p-6 bg-white border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Personal Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                  <input type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender</label>
                  <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* MEDICAL INFORMATION */}
            <Card className="p-6 bg-white border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Medical Profile (Restricted RLS Security)</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Blood Group</label>
                  <select value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Known Allergies</label>
                  <input type="text" value={formData.allergies} onChange={(e) => setFormData({ ...formData, allergies: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pre-existing Conditions</label>
                  <input type="text" value={formData.conditions} onChange={(e) => setFormData({ ...formData, conditions: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Emergency Contact Person</label>
                  <input type="text" value={formData.emergencyName} onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Emergency Phone</label>
                  <input type="tel" value={formData.emergencyPhone} onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
              </div>
            </Card>

            <Button type="submit" className="font-bold gap-2 shadow-sm">
              <Save className="h-4 w-4" /> Save Profile Settings
            </Button>

          </form>
        </main>
      </div>
    </div>
  );
}
