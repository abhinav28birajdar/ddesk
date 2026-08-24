import React from 'react';
import { AIPostVisitSummary } from '@/types';
import { Sparkles, CheckCircle2, Pill, Heart, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface PostVisitSummaryCardProps {
  summary: AIPostVisitSummary;
}

export function PostVisitSummaryCard({ summary }: PostVisitSummaryCardProps) {
  return (
    <Card className="border border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/20 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 border-b border-emerald-100 bg-emerald-50/40">
        <div className="flex items-center gap-2 text-emerald-800">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <CardTitle className="text-base font-bold">Patient-Friendly Consultation Summary</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4 text-xs">
        
        {/* VISIT SUMMARY */}
        <div>
          <span className="font-bold text-slate-400 uppercase tracking-wider">Visit Overview</span>
          <p className="text-slate-800 font-medium mt-0.5 leading-relaxed">{summary.visit_summary}</p>
        </div>

        {/* IMPORTANT FINDINGS */}
        {summary.important_findings && summary.important_findings.length > 0 && (
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider">Key Medical Findings</span>
            <ul className="mt-1 space-y-1">
              {summary.important_findings.map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 bg-white p-2 rounded-lg border border-slate-100">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* MEDICATION SCHEDULE */}
        {summary.medication_schedule && summary.medication_schedule.length > 0 && (
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Pill className="h-3.5 w-3.5 text-sky-500" /> Prescribed Medications
            </span>
            <div className="mt-1 space-y-1.5">
              {summary.medication_schedule.map((med: any, i: number) => (
                <div key={i} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900">{med.medicine}</span>
                    <span className="text-slate-500 ml-2">({med.dosage})</span>
                  </div>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    {med.frequency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CARE INSTRUCTIONS */}
        {summary.care_instructions && summary.care_instructions.length > 0 && (
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Heart className="h-3.5 w-3.5 text-rose-500" /> Care & Recovery Instructions
            </span>
            <ul className="mt-1 space-y-1 text-slate-700 list-disc list-inside">
              {summary.care_instructions.map((inst: string, i: number) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
