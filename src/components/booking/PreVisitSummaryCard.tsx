import React from 'react';
import { AIPreVisitSummary } from '@/types';
import { Sparkles, AlertTriangle, HelpCircle, FileText, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface PreVisitSummaryCardProps {
  summary: AIPreVisitSummary;
}

export function PreVisitSummaryCard({ summary }: PreVisitSummaryCardProps) {
  const urgencyVariant =
    summary.urgency_level === 'High'
      ? 'destructive'
      : summary.urgency_level === 'Medium'
      ? 'warning'
      : 'success';

  return (
    <Card className="border border-sky-100 bg-gradient-to-br from-white via-sky-50/20 to-teal-50/20 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 border-b border-sky-100/60 bg-sky-50/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-700">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold">AI Pre-Visit Clinical Summary</CardTitle>
          </div>
          <Badge variant={urgencyVariant}>
            {summary.urgency_level} Urgency
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        
        {/* CHIEF COMPLAINT */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chief Complaint</span>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">{summary.chief_complaint}</p>
        </div>

        {/* CONCISE SUMMARY */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Symptom Summary</span>
          <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{summary.concise_summary}</p>
        </div>

        {/* SUGGESTED QUESTIONS FOR DOCTOR */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5 text-sky-500" /> Suggested Clinical Questions
          </span>
          <ul className="mt-1.5 space-y-1 text-xs text-slate-700">
            {summary.suggested_questions.map((q: string, i: number) => (
              <li key={i} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-100">
                <span className="font-bold text-sky-600">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* MEDICAL DISCLAIMER */}
        <div className="rounded-xl bg-amber-50/80 border border-amber-200/60 p-3 flex items-start gap-2 text-[11px] text-amber-900">
          <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Disclaimer:</strong> AI-generated information is intended solely to help prepare for your consultation and is not a medical diagnosis.
          </p>
        </div>

      </CardContent>
    </Card>
  );
}
