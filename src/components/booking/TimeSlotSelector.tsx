'use client';

import React from 'react';
import { TimeSlot } from '@/types';
import { Clock, CheckCircle2, Lock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  isLoading?: boolean;
}

export function TimeSlotSelector({
  slots,
  selectedSlot,
  onSelectSlot,
  isLoading = false
}: TimeSlotSelectorProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-12 rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!slots || slots.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center bg-slate-50/50">
        <Clock className="h-8 w-8 text-slate-300 mx-auto mb-2" />
        <h4 className="text-sm font-semibold text-slate-700">No Slots Available for this Date</h4>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
          The doctor is either off-duty, fully booked, or on leave for the selected date. Please choose another date.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Select an open consultation time:</span>
        <span className="font-semibold text-sky-600">{slots.filter((s) => s.is_available).length} Available Slots</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {slots.map((slot, idx) => {
          const isSelected = selectedSlot?.start_time === slot.start_time;

          return (
            <button
              key={idx}
              type="button"
              disabled={!slot.is_available}
              onClick={() => onSelectSlot(slot)}
              className={`relative flex items-center justify-between rounded-xl p-3 border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/20 text-sky-950 font-bold shadow-xs'
                  : slot.is_available
                  ? 'border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50 text-slate-800'
                  : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed opacity-60'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className={`h-4 w-4 ${isSelected ? 'text-sky-600' : slot.is_available ? 'text-slate-400' : 'text-slate-300'}`} />
                <span className="text-sm">{slot.display_time}</span>
              </div>

              {isSelected && <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />}
              {!slot.is_available && (
                <Lock className="h-3.5 w-3.5 text-slate-300 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
