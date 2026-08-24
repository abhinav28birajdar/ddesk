import React from 'react';
import Link from 'next/link';
import { Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DoctorPendingApprovalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-slate-50 to-emerald-50 p-4 font-sans">
      <Card className="w-full max-w-md p-8 bg-white border border-slate-200 shadow-xl text-center space-y-6">
        <div className="mx-auto h-16 w-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shadow-md">
          <Clock className="h-8 w-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900">Application Under Review</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Thank you for applying to Ddesk. Your medical registration number and credentials are currently being verified by platform administrators.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Status:</span>
            <span className="font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">PENDING APPROVAL</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Estimated Verification:</span>
            <span className="font-bold text-slate-800">12 - 24 Hours</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <Link href="/doctor/dashboard">
            <Button className="w-full font-bold bg-slate-900">Preview Doctor Dashboard</Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full text-xs">Return to Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
