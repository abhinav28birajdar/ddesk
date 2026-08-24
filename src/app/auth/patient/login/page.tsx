'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Stethoscope, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function PatientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('john.miller@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/patient/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-slate-50 to-teal-50 p-4 font-sans">
      <Card className="w-full max-w-md p-6 bg-white border border-slate-200 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-sky-600 font-bold text-2xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white">
              <Stethoscope className="h-5 w-5" />
            </div>
            Ddesk<span className="text-slate-900">.</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Patient Sign In</h1>
          <p className="text-xs text-slate-500">Access your healthcare appointments, prescriptions, & AI summaries</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-3 font-bold gap-2 text-sm shadow-md">
            Sign In to Patient Portal <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 space-y-2">
          <p>
            Don't have a patient account?{' '}
            <Link href="/auth/patient/register" className="font-bold text-sky-600 hover:text-sky-700">
              Register here
            </Link>
          </p>
          <p>
            Are you a doctor?{' '}
            <Link href="/auth/doctor/login" className="font-bold text-emerald-600 hover:text-emerald-700">
              Doctor Login
            </Link>
          </p>
        </div>

      </Card>
    </div>
  );
}
