'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Stethoscope, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function PatientRegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    dateOfBirth: '',
    gender: 'Male',
    bloodGroup: 'O+',
    emergencyName: '',
    emergencyPhone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/patient/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-slate-50 to-teal-50 p-4 font-sans py-12">
      <Card className="w-full max-w-xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-sky-600 font-bold text-2xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white">
              <Stethoscope className="h-5 w-5" />
            </div>
            Ddesk<span className="text-slate-900">.</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Patient Registration</h1>
          <p className="text-xs text-slate-500">Create your Ddesk healthcare profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
              <input required type="text" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="John Miller" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
              <input required type="email" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="john@example.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
              <input required type="tel" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="+1 (555) 000-0000" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Password *</label>
              <input required type="password" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="••••••••" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
              <input type="date" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Gender</label>
              <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Blood Group</label>
              <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="font-bold text-slate-900 text-xs">Emergency Contact Details</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <input type="text" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="Contact Person Name" />
              <input type="tel" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="Emergency Phone" />
            </div>
          </div>

          <Button type="submit" className="w-full py-3 font-bold gap-2 text-sm shadow-md mt-4">
            Complete Patient Sign Up <ArrowRight className="h-4 w-4" />
          </Button>

        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already have an account?{' '}
          <Link href="/auth/patient/login" className="font-bold text-sky-600 hover:text-sky-700">
            Sign in here
          </Link>
        </div>

      </Card>
    </div>
  );
}
