import React from 'react';
import Link from 'next/link';
import { Hospital } from '@/types';
import { MapPin, Phone, Mail, Globe, Building2, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface HospitalCardProps {
  hospital: Hospital;
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <Card className="overflow-hidden border border-slate-200/80 hover:shadow-lg transition-all duration-300 group">
      {/* COVER IMAGE */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
        <img
          src={hospital.cover_image_url || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000'}
          alt={hospital.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-lg font-bold drop-shadow-xs">{hospital.name}</h3>
          <p className="text-xs text-slate-200 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-sky-400" />
            {hospital.address}, {hospital.city}, {hospital.state}
          </p>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        <p className="text-xs text-slate-600 line-clamp-2">{hospital.description}</p>

        <div className="space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-slate-400" />
            <span>{hospital.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            <span>{hospital.email}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <Building2 className="h-3.5 w-3.5" /> Multi-Specialty Clinic
          </span>
          <Link href={`/hospitals/${hospital.id}`}>
            <Button variant="outline" size="sm" className="gap-1 text-xs">
              View Hospital & Doctors <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
