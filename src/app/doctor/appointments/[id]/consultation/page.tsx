'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Stethoscope,
  Sparkles,
  Pill,
  CheckCircle2,
  ArrowLeft,
  Plus,
  Trash2,
  Calendar
} from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { PreVisitSummaryCard } from '@/components/booking/PreVisitSummaryCard';
import { PostVisitSummaryCard } from '@/components/patient/PostVisitSummaryCard';
import { MOCK_APPOINTMENTS } from '@/lib/supabase/mock-data';
import { getAIProvider } from '@/lib/ai/provider';
import { AIPostVisitSummary } from '@/types';

export default function DoctorConsultationPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const appointment = MOCK_APPOINTMENTS.find((a) => a.id === id) || MOCK_APPOINTMENTS[0];

  const [clinicalNotes, setClinicalNotes] = useState(
    appointment.consultation_notes ||
      'Mild localized eczema. Advised gentle topical moisturizers and short hydrocortisone course.'
  );
  const [diagnosis, setDiagnosis] = useState(appointment.diagnosis || 'Atopic Dermatitis (Mild)');
  const [followUpDate, setFollowUpDate] = useState(appointment.follow_up_date || '2026-09-15');

  // PRESCRIPTION BUILDER STATE
  const [medicines, setMedicines] = useState([
    {
      medicine_name: 'Hydrocortisone 1% Cream',
      dosage: 'Pea-sized amount',
      frequency: 'Twice daily',
      instructions: 'Apply topically to affected skin after bathing',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
    }
  ]);

  const [isGeneratingPostAI, setIsGeneratingPostAI] = useState(false);
  const [postAISummary, setPostAISummary] = useState<AIPostVisitSummary | null>(
    appointment.post_visit_summary || null
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      {
        medicine_name: '',
        dosage: '',
        frequency: 'Once Daily',
        instructions: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
      }
    ]);
  };

  const handleGeneratePostAISummary = async () => {
    if (!clinicalNotes.trim()) return;
    setIsGeneratingPostAI(true);

    const provider = getAIProvider();
    const summary = await provider.generatePostVisitSummary({
      clinicalNotes,
      diagnosis
    });

    setPostAISummary(summary);
    setIsGeneratingPostAI(false);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appointment.status = 'COMPLETED';
    appointment.consultation_notes = clinicalNotes;
    appointment.diagnosis = diagnosis;
    appointment.post_visit_summary = postAISummary;
    appointment.follow_up_date = followUpDate;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="DOCTOR" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          
          <Link href="/doctor/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700">
            <ArrowLeft className="h-4 w-4" /> Back to Doctor Dashboard
          </Link>

          {/* PATIENT SUMMARY BAR */}
          <Card className="p-6 bg-white border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <Badge variant="default">Active Consultation</Badge>
                <h1 className="text-2xl font-black text-slate-900 mt-1">
                  Patient: {appointment.patient?.full_name}
                </h1>
              </div>
              <Badge variant={appointment.status === 'CONFIRMED' ? 'default' : 'success'}>
                {appointment.status}
              </Badge>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              Chief Complaint: <strong className="text-slate-900">"{appointment.symptoms}"</strong>
            </div>
          </Card>

          {/* AI PRE-VISIT SUMMARY PREVIEW */}
          {appointment.pre_visit_summary && (
            <PreVisitSummaryCard summary={appointment.pre_visit_summary} />
          )}

          {/* CONSULTATION FORM */}
          <form onSubmit={handleFinalSubmit} className="space-y-6 text-xs">
            
            {/* CLINICAL NOTES & DIAGNOSIS */}
            <Card className="p-6 bg-white border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                1. Clinical Findings & Diagnosis
              </h3>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Diagnosis *</label>
                <input
                  required
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Essential Hypertension, Atopic Dermatitis..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinical Consultation Notes *</label>
                <textarea
                  required
                  rows={4}
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Enter clinical examination notes, physical observations, and medical advice..."
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  onClick={handleGeneratePostAISummary}
                  disabled={!clinicalNotes.trim() || isGeneratingPostAI}
                  className="gap-2 font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                >
                  {isGeneratingPostAI ? (
                    'Generating AI Summary...'
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" /> Generate AI Patient-Friendly Summary
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* AI POST-VISIT SUMMARY DISPLAY */}
            {postAISummary && (
              <PostVisitSummaryCard summary={postAISummary} />
            )}

            {/* DIGITAL PRESCRIPTION BUILDER */}
            <Card className="p-6 bg-white border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Pill className="h-4 w-4 text-emerald-600" /> 2. Digital Prescription Builder
                </h3>
                <Button type="button" variant="outline" size="sm" onClick={handleAddMedicine} className="gap-1 font-bold">
                  <Plus className="h-3.5 w-3.5" /> Add Medicine
                </Button>
              </div>

              <div className="space-y-3">
                {medicines.map((med, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Medicine Name</label>
                        <input
                          type="text"
                          value={med.medicine_name}
                          onChange={(e) => {
                            const copy = [...medicines];
                            copy[idx].medicine_name = e.target.value;
                            setMedicines(copy);
                          }}
                          placeholder="e.g. Amoxicillin"
                          className="w-full p-2 rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Dosage</label>
                        <input
                          type="text"
                          value={med.dosage}
                          onChange={(e) => {
                            const copy = [...medicines];
                            copy[idx].dosage = e.target.value;
                            setMedicines(copy);
                          }}
                          placeholder="e.g. 500 mg"
                          className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Frequency</label>
                        <select
                          value={med.frequency}
                          onChange={(e) => {
                            const copy = [...medicines];
                            copy[idx].frequency = e.target.value;
                            setMedicines(copy);
                          }}
                          className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium"
                        >
                          <option value="Once Daily">Once Daily</option>
                          <option value="Twice Daily">Twice Daily</option>
                          <option value="Three Times Daily">Three Times Daily</option>
                          <option value="Every 6 Hours">Every 6 Hours</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* FOLLOW-UP DATE */}
            <Card className="p-6 bg-white border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">3. Follow-Up Schedule</h3>
              <div className="max-w-xs">
                <label className="block font-bold text-slate-700 mb-1">Recommended Follow-Up Date</label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>
            </Card>

            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Consultation Saved & Prescription Dispatched to Patient Portal!
              </div>
            ) : (
              <Button type="submit" className="font-bold size-lg gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">
                <CheckCircle2 className="h-5 w-5" /> Finalize Consultation & Notify Patient
              </Button>
            )}

          </form>

        </main>
      </div>
    </div>
  );
}
