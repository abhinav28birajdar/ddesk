'use client';

import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, XCircle, AlertOctagon, Building2 } from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MOCK_DOCTORS } from '@/lib/supabase/mock-data';
import { DoctorProfile, ApprovalStatus } from '@/types';

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([
    ...MOCK_DOCTORS,
    {
      id: 'd-pending-1',
      user_id: 'doc-user-99',
      medical_registration_number: 'MD-994012',
      specialization_id: 's4',
      specialization: { id: 's4', name: 'Neurologist' },
      qualification: 'MD, PhD - Stanford Medicine',
      years_experience: 16,
      bio: 'Board-certified Neurologist specializing in neuro-oncology and epilepsy care.',
      consultation_fee: 200,
      approval_status: 'PENDING',
      slot_duration: 30,
      buffer_minutes: 10,
      max_daily_appointments: 12,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profile: {
        id: 'doc-user-99',
        role: 'DOCTOR',
        full_name: 'Dr. Marcus Vance',
        email: 'marcus.vance@ddesk.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
  ]);

  const handleUpdateStatus = (doctorId: string, newStatus: ApprovalStatus) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === doctorId ? { ...d, approval_status: newStatus } : d))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <AppSidebar role="ADMIN" />

        <main className="flex-1 p-6 md:p-8 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Doctor Approval & Management</h1>
            <p className="text-xs text-slate-500 mt-1">Review medical credentials, approve registration applications, & manage doctor status</p>
          </div>

          <div className="space-y-4">
            {doctors.map((doc) => {
              const statusVariant =
                doc.approval_status === 'APPROVED'
                  ? 'success'
                  : doc.approval_status === 'PENDING'
                  ? 'warning'
                  : 'destructive';

              return (
                <Card key={doc.id} className="p-6 bg-white border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                        <img src={doc.profile?.avatar_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300'} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{doc.profile?.full_name}</h3>
                          <Badge variant={statusVariant}>{doc.approval_status}</Badge>
                        </div>
                        <p className="text-xs text-slate-500">{doc.qualification} • Reg No: {doc.medical_registration_number}</p>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center gap-2">
                      {doc.approval_status === 'PENDING' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(doc.id, 'APPROVED')}
                            className="bg-emerald-600 hover:bg-emerald-700 font-bold text-xs gap-1"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleUpdateStatus(doc.id, 'REJECTED')}
                            className="font-bold text-xs gap-1"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </Button>
                        </>
                      )}

                      {doc.approval_status === 'APPROVED' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(doc.id, 'SUSPENDED')}
                          className="text-amber-700 border-amber-300 font-bold text-xs gap-1 hover:bg-amber-50"
                        >
                          <AlertOctagon className="h-3.5 w-3.5" /> Suspend
                        </Button>
                      )}

                      {doc.approval_status === 'SUSPENDED' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(doc.id, 'APPROVED')}
                          className="bg-emerald-600 font-bold text-xs gap-1"
                        >
                          Re-Approve
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                    <span>Specialization: <strong>{doc.specialization?.name}</strong></span>
                    <span>Fee: <strong>${doc.consultation_fee}</strong></span>
                    <span>Experience: <strong>{doc.years_experience} Years</strong></span>
                  </div>
                </Card>
              );
            })}
          </div>

        </main>
      </div>
    </div>
  );
}
