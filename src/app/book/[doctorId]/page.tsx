'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Calendar as CalendarIcon,
  Clock,
  Building2,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Lock,
  DollarSign,
  FileText
} from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TimeSlotSelector } from '@/components/booking/TimeSlotSelector';
import { PreVisitSummaryCard } from '@/components/booking/PreVisitSummaryCard';
import { MOCK_DOCTORS } from '@/lib/supabase/mock-data';
import { AppointmentService } from '@/services/appointment.service';
import { getAIProvider } from '@/lib/ai/provider';
import { TimeSlot, AIPreVisitSummary } from '@/types';

export default function BookingFlowPage({
  params
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const { doctorId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();

  const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId) || MOCK_DOCTORS[0];

  const paramHospital = searchParams.get('hospital') || doctor.hospitals?.[0]?.id || 'h1';
  const paramDate = searchParams.get('date') || new Date().toISOString().split('T')[0];

  // STEP CONTROLLER (1..7)
  const [step, setStep] = useState<number>(1);

  // FORM STATE
  const [selectedHospital, setSelectedHospital] = useState(paramHospital);
  const [selectedDate, setSelectedDate] = useState(paramDate);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // SYMPTOMS STATE
  const [symptoms, setSymptoms] = useState('');
  const [symptomDuration, setSymptomDuration] = useState('3 days');
  const [symptomSeverity, setSymptomSeverity] = useState('Moderate');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // AI & HOLD STATE
  const [aiSummary, setAiSummary] = useState<AIPreVisitSummary | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [holdId, setHoldId] = useState<string | null>(null);
  const [holdTimerSeconds, setHoldTimerSeconds] = useState(300); // 5 minutes
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [confirmedAppointmentId, setConfirmedAppointmentId] = useState<string | null>(null);

  // Load slots when hospital or date changes
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

  // Hold Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (holdId && holdTimerSeconds > 0) {
      interval = setInterval(() => {
        setHoldTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [holdId, holdTimerSeconds]);

  // Handle Step 4 -> 5 AI Generation
  const handleGenerateAISummary = async () => {
    if (!symptoms.trim()) return;
    setIsGeneratingAI(true);
    setBookingError(null);

    const provider = getAIProvider();
    const summary = await provider.generatePreVisitSummary({
      symptoms,
      duration: symptomDuration,
      severity: symptomSeverity,
      additionalNotes
    });

    setAiSummary(summary);
    setIsGeneratingAI(false);
    setStep(5);
  };

  // Handle Step 5 -> 6 Create Temporary Hold
  const handleProceedToReview = async () => {
    if (!selectedSlot) return;
    setBookingError(null);

    const holdResult = await AppointmentService.createHold({
      doctorId: doctor.id,
      patientId: 'pat-user-1',
      hospitalId: selectedHospital,
      start: selectedSlot.start_time,
      end: selectedSlot.end_time
    });

    if (!holdResult.success) {
      setBookingError(holdResult.message || 'Slot hold failed.');
      return;
    }

    setHoldId(holdResult.holdId || `hold-${Date.now()}`);
    setHoldTimerSeconds(300);
    setStep(6);
  };

  // Handle Step 6 -> 7 Confirm Appointment (Atomic RPC Execution)
  const handleConfirmAppointment = async () => {
    if (!selectedSlot) return;
    setIsSubmittingBooking(true);
    setBookingError(null);

    const result = await AppointmentService.createAppointmentAtomic({
      patientId: 'pat-user-1',
      doctorId: doctor.id,
      hospitalId: selectedHospital,
      start: selectedSlot.start_time,
      end: selectedSlot.end_time,
      symptoms,
      symptomDuration,
      symptomSeverity,
      additionalNotes
    });

    setIsSubmittingBooking(false);

    if (!result.success) {
      setBookingError(result.message || 'Appointment booking failed.');
      return;
    }

    setConfirmedAppointmentId(result.appointment?.id || 'apt-101');
    setStep(7);
  };

  const stepsList = [
    'Hospital',
    'Date',
    'Time Slot',
    'Symptoms',
    'AI Analysis',
    'Review Hold',
    'Confirmation'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* TOP STEPPER BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between overflow-x-auto gap-2 pb-1">
            {stepsList.map((label, idx) => {
              const stepNum = idx + 1;
              const isCurrent = step === stepNum;
              const isPassed = step > stepNum;

              return (
                <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-sky-600 text-white ring-4 ring-sky-100'
                        : isPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="h-4 w-4" /> : stepNum}
                  </div>
                  <span
                    className={`text-xs font-medium whitespace-nowrap ${
                      isCurrent
                        ? 'text-sky-700 font-bold'
                        : isPassed
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {label}
                  </span>
                  {idx < stepsList.length - 1 && (
                    <div className="h-0.5 w-4 bg-slate-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ERROR BANNER */}
        {bookingError && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-800 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Booking Error:</span> {bookingError}
            </div>
          </div>
        )}

        {/* STEP CONTENT SWITCHER */}
        <Card className="p-6 md:p-8 bg-white border border-slate-200 shadow-md">
          
          {/* STEP 1: SELECT HOSPITAL */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 1: Select Hospital / Clinic Facility</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Dr. {doctor.profile?.full_name} practices at the following healthcare facilities:
                </p>
              </div>

              <div className="space-y-3">
                {doctor.hospitals?.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => setSelectedHospital(h.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedHospital === h.id
                        ? 'border-sky-500 bg-sky-50/50 ring-2 ring-sky-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{h.name}</h4>
                        <p className="text-xs text-slate-500">{h.address}, {h.city}</p>
                      </div>
                    </div>
                    {selectedHospital === h.id && <Badge variant="success">Selected</Badge>}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => setStep(2)} className="gap-1.5 font-bold">
                  Next: Select Date <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT DATE */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 2: Choose Consultation Date</h2>
                <p className="text-xs text-slate-500 mt-1">Select an open date for your appointment:</p>
              </div>

              <div className="max-w-md">
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 font-bold focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} className="gap-1.5 font-bold">
                  Next: Choose Time Slot <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: SELECT TIME SLOT */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 3: Select Available Time Slot</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Viewing dynamic slots for {selectedDate}:
                </p>
              </div>

              <TimeSlotSelector
                slots={slots}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
                isLoading={isLoadingSlots}
              />

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button disabled={!selectedSlot} onClick={() => setStep(4)} className="gap-1.5 font-bold">
                  Next: Enter Symptoms <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: SYMPTOMS FORM */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 4: Describe Symptoms Before Booking</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Your symptoms will be summarized by AI for Dr. {doctor.profile?.full_name} to review.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    What symptoms are you experiencing? *
                  </label>
                  <textarea
                    rows={3}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="e.g. Persistent headaches, mild fever, or chest discomfort..."
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      When did symptoms start?
                    </label>
                    <select
                      value={symptomDuration}
                      onChange={(e) => setSymptomDuration(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium"
                    >
                      <option value="Today">Today</option>
                      <option value="2-3 days ago">2-3 days ago</option>
                      <option value="1 week ago">1 week ago</option>
                      <option value="1 month or longer">1 month or longer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Severity Level
                    </label>
                    <select
                      value={symptomSeverity}
                      onChange={(e) => setSymptomSeverity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium"
                    >
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Additional Notes or Medical History
                  </label>
                  <input
                    type="text"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="e.g. Existing hypertension or allergies..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                <Button
                  disabled={!symptoms.trim() || isGeneratingAI}
                  onClick={handleGenerateAISummary}
                  className="gap-2 font-bold bg-gradient-to-r from-sky-600 to-teal-600 text-white"
                >
                  {isGeneratingAI ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin" /> Generating AI Summary...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" /> Analyze with AI & Next <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: AI PRE-VISIT SUMMARY PREVIEW */}
          {step === 5 && aiSummary && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 5: Review AI Pre-Visit Clinical Summary</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Review the structured clinical preview generated for your upcoming consultation.
                </p>
              </div>

              <PreVisitSummaryCard summary={aiSummary} />

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setStep(4)}>Back</Button>
                <Button onClick={handleProceedToReview} className="gap-1.5 font-bold">
                  Place Slot Hold & Review <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW & SLOT HOLD */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Step 6: Review & Final Hold Confirmation</h2>
                  <p className="text-xs text-slate-500 mt-1">Verify all appointment details before confirming.</p>
                </div>
                
                {/* 5 MINUTE HOLD COUNTER */}
                <div className="flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold">
                  <Lock className="h-4 w-4 text-amber-600" />
                  <span>Slot Held: {Math.floor(holdTimerSeconds / 60)}:{(holdTimerSeconds % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-bold text-slate-900">{doctor.profile?.full_name} ({doctor.qualification})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Specialization:</span>
                  <span className="font-bold text-slate-900">{doctor.specialization?.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Consultation Date & Time:</span>
                  <span className="font-bold text-sky-700">{selectedDate} @ {selectedSlot?.display_time}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Consultation Fee:</span>
                  <span className="font-bold text-emerald-600">${doctor.consultation_fee}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setStep(5)}>Back</Button>
                <Button
                  disabled={isSubmittingBooking}
                  onClick={handleConfirmAppointment}
                  className="gap-2 font-bold size-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {isSubmittingBooking ? (
                    'Creating Appointment...'
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5" /> Confirm Appointment Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* STEP 7: CONFIRMATION SUCCESS */}
          {step === 7 && (
            <div className="py-8 text-center space-y-6">
              <div className="mx-auto h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <Badge variant="success" className="text-xs px-3 py-1">Booking Confirmed</Badge>
                <h2 className="text-2xl font-extrabold text-slate-900">Your Appointment is Booked!</h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Appointment ID: <code className="font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded">{confirmedAppointmentId}</code>.
                  Google Calendar event created & email notification queued.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link href="/patient/appointments">
                  <Button className="font-bold gap-2">
                    <FileText className="h-4 w-4" /> View My Appointments
                  </Button>
                </Link>
                <Link href="/patient/dashboard">
                  <Button variant="outline">Go to Patient Dashboard</Button>
                </Link>
              </div>
            </div>
          )}

        </Card>

      </main>

      <Footer />
    </div>
  );
}
