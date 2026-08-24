'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import {
  Stethoscope,
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  Building2,
  DollarSign,
  Globe,
  Award,
  ArrowRight
} from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TimeSlotSelector } from '@/components/booking/TimeSlotSelector';
import { MOCK_DOCTORS } from '@/lib/supabase/mock-data';
import { AppointmentService } from '@/services/appointment.service';
import { TimeSlot } from '@/types';

export default function DoctorPublicProfilePage({
  params
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const { doctorId } = use(params);
  const router = useRouter();

  const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId) || MOCK_DOCTORS[0];

  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedHospital, setSelectedHospital] = useState(
    doctor.hospitals?.[0]?.id || 'h1'
  );
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  useEffect(() => {
    async function loadSlots() {
      setIsLoadingSlots(true);
      const available = await AppointmentService.getAvailableSlots(
        doctor.id,
        selectedHospital,
        selectedDate
      );
      setSlots(available);
      setIsLoadingSlots(false);
    }
    loadSlots();
  }, [doctor.id, selectedHospital, selectedDate]);

  const handleProceedToBooking = () => {
    if (!selectedSlot) return;
    router.push(
      `/book/${doctor.id}?hospital=${selectedHospital}&date=${selectedDate}&start=${encodeURIComponent(
        selectedSlot.start_time
      )}&end=${encodeURIComponent(selectedSlot.end_time)}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* DOCTOR HEADER CARD */}
        <Card className="p-6 md:p-8 bg-white border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            
            <div className="relative flex-shrink-0">
              <div className="h-32 w-32 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
                <img
                  src={doctor.profile?.avatar_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300'}
                  alt={doctor.profile?.full_name || 'Doctor'}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {doctor.profile?.full_name}
                  </h1>
                  <p className="text-sm font-semibold text-slate-600 mt-0.5">{doctor.qualification}</p>
                </div>
                <Badge variant="default" className="text-sm py-1 px-3 bg-sky-100 text-sky-800 border-sky-200">
                  {doctor.specialization?.name}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                {doctor.bio}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-slate-600 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-sky-500" /> {doctor.years_experience} Years Experience
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-teal-500" /> Languages: {doctor.languages?.join(', ')}
                </span>
                <span className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                  <DollarSign className="h-4 w-4 text-emerald-600" /> ${doctor.consultation_fee} Fee
                </span>
              </div>
            </div>

          </div>
        </Card>

        {/* TWO-COLUMN LAYOUT: DETAILS & REAL-TIME BOOKING */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLS: HOSPITALS & AVAILABILITY OVERVIEW */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* HOSPITAL AFFILIATIONS */}
            <Card className="p-6 bg-white border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-sky-600" /> Associated Hospitals & Clinics
              </h3>
              <div className="space-y-4">
                {doctor.hospitals?.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => setSelectedHospital(h.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedHospital === h.id
                        ? 'border-sky-500 bg-sky-50/50 ring-1 ring-sky-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{h.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" /> {h.address}, {h.city}
                      </p>
                    </div>
                    {selectedHospital === h.id && (
                      <Badge variant="success">Selected Facility</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* RIGHT COL: REAL-TIME APPOINTMENT SLOT BOOKING */}
          <div className="space-y-6">
            <Card className="p-6 bg-white border border-slate-200 shadow-md">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-sky-600" /> Book an Appointment
              </h3>

              {/* DATE PICKER INPUT */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Select Consultation Date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedSlot(null);
                    }}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                {/* SLOT SELECTOR */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Available Time Slots
                  </label>
                  <TimeSlotSelector
                    slots={slots}
                    selectedSlot={selectedSlot}
                    onSelectSlot={setSelectedSlot}
                    isLoading={isLoadingSlots}
                  />
                </div>

                {/* PROCEED BUTTON */}
                <Button
                  disabled={!selectedSlot}
                  onClick={handleProceedToBooking}
                  className="w-full py-3 gap-2 font-bold text-sm mt-4 shadow-sm"
                >
                  Proceed to Symptom Check <ArrowRight className="h-4 w-4" />
                </Button>

              </div>
            </Card>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
