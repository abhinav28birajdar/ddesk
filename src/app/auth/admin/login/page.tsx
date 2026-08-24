'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@ddesk.com');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 font-sans text-white">
      <Card className="w-full max-w-md p-6 bg-slate-800 border border-slate-700 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Ddesk Platform Admin</h1>
          <p className="text-xs text-slate-400">Secure Administrative Console</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Admin Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <Button type="submit" className="w-full py-3 font-bold gap-2 text-sm bg-amber-500 hover:bg-amber-600 text-slate-950">
            Access Admin Console <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

      </Card>
    </div>
  );
}
