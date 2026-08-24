import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Calendar, Clock, Stethoscope, ShieldCheck, DollarSign } from 'lucide-react';
import { DoctorProfile } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';

interface DoctorCardProps {
  doctor: DoctorProfile;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const hospitalName = doctor.hospitals?.[0]?.name || 'City General Hospital';
  const cityName = doctor.hospitals?.[0]?.city || 'New York';

  return (
    <Card className="overflow-hidden border border-slate-200/80 hover:border-sky-300 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-5">
          
          {/* AVATAR & EXPERIENCE */}
          <div className="relative flex-shrink-0">
            <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
              <img
                src={doctor.profile?.avatar_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300'}
                alt={doctor.profile?.full_name || 'Doctor'}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* DOCTOR DETAILS */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {doctor.profile?.full_name || 'Doctor Name'}
                </h3>
                <p className="text-xs font-semibold text-slate-500">{doctor.qualification}</p>
              </div>
              <Badge variant="default" className="bg-sky-50 text-sky-700 border-sky-200">
                {doctor.specialization?.name || 'Specialist'}
              </Badge>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2">{doctor.bio}</p>

            {/* METRICS ROW */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Stethoscope className="h-3.5 w-3.5 text-sky-500" />
                {doctor.years_experience} yrs exp
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {hospitalName}, {cityName}
              </span>
              <span className="flex items-center gap-1 text-slate-700 font-bold">
                <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                ${doctor.consultation_fee} Fee
              </span>
            </div>

            {/* ACTIONS */}
            <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-100 mt-3">
              <Link href={`/doctors/${doctor.id}`} className="text-xs font-semibold text-sky-600 hover:text-sky-700">
                View Full Profile & Availability →
              </Link>
              <Link href={`/book/${doctor.id}`}>
                <Button size="sm" className="gap-1.5 font-medium shadow-xs">
                  <Calendar className="h-3.5 w-3.5" /> Book Appointment
                </Button>
              </Link>
            </div>

          </div>

        </div>
      </CardContent>
    </Card>
  );
}
