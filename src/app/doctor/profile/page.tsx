'use client';

import React, { useState } from 'react';
import { Stethoscope, Clock, Save, Plus, Trash2, CheckCircle2, Building2 } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MOCK_DOCTORS } from '@/lib/supabase/mock-data';

export default function DoctorProfilePage() {
  const doctor = MOCK_DOCTORS[0];
  const [saved, setSaved] = useState(false);

  const [availability, setAvailability] = useState([
    { day: 'Monday (1)', startTime: '09:00', endTime: '13:00' },
    { day: 'Monday (2)', startTime: '14:00', endTime: '18:00' },
    { day: 'Tuesday', startTime: '09:00', endTime: '13:00' },
    { day: 'Wednesday', startTime: '09:00', endTime: '13:00' },
    { day: 'Thursday', startTime: '14:00', endTime: '18:00' },
    { day: 'Friday', startTime: '09:00', endTime: '13:00' }
  ]);

  const [fee, setFee] = useState(doctor.consultation_fee);
  const [slotDuration, setSlotDuration] = useState(doctor.slot_duration);
  const [bufferMinutes, setBufferMinutes] = useState(doctor.buffer_minutes);
  const [bio, setBio] = useState(doctor.bio);

  const handleAddSlotRange = () => {
    setAvailability([...availability, { day: 'Monday', startTime: '09:00', endTime: '12:00' }]);
  };

  const handleRemoveSlotRange = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="DOCTOR" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Doctor Profile & Availability Configurator</h1>
              <p className="text-xs text-slate-500 mt-1">Configure working days, time slot durations, buffer intervals, & consultation fees</p>
            </div>
            {saved && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="h-4 w-4" /> Availability Saved
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6 text-xs">
            
            {/* CONSULTATION PARAMETERS */}
            <Card className="p-6 bg-white border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Consultation Parameters</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consultation Fee ($)</label>
                  <input type="number" value={fee} onChange={(e) => setFee(Number(e.target.value))} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Slot Duration (Minutes)</label>
                  <select value={slotDuration} onChange={(e) => setSlotDuration(Number(e.target.value))} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">60 Minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Buffer Time Between Slots</label>
                  <select value={bufferMinutes} onChange={(e) => setBufferMinutes(Number(e.target.value))} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
                    <option value="5">5 Minutes</option>
                    <option value="10">10 Minutes</option>
                    <option value="15">15 Minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Professional Bio</label>
                <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" />
              </div>
            </Card>

            {/* WORKING DAYS & MULTI-RANGE TIME CONFIGURATOR */}
            <Card className="p-6 bg-white border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Working Days & Time Ranges</h3>
                  <p className="text-slate-500">Supports multiple time ranges per day (e.g. 09:00-13:00 and 14:00-18:00)</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={handleAddSlotRange} className="gap-1 font-bold">
                  <Plus className="h-3.5 w-3.5" /> Add Range
                </Button>
              </div>

              <div className="space-y-3">
                {availability.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="w-32 font-bold text-slate-800">{item.day}</span>
                    <div className="flex items-center gap-2 flex-1">
                      <input type="time" value={item.startTime} onChange={() => {}} className="p-2 rounded-lg border border-slate-200 bg-white font-medium" />
                      <span className="text-slate-400">to</span>
                      <input type="time" value={item.endTime} onChange={() => {}} className="p-2 rounded-lg border border-slate-200 bg-white font-medium" />
                    </div>
                    <button type="button" onClick={() => handleRemoveSlotRange(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            <Button type="submit" className="font-bold gap-2 shadow-sm bg-emerald-600 hover:bg-emerald-700">
              <Save className="h-4 w-4" /> Save Doctor Availability Settings
            </Button>

          </form>
        </main>
      </div>
    </div>
  );
}
