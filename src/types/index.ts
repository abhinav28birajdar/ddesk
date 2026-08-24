export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'RESCHEDULED'
  | 'NO_SHOW'
  | 'NEEDS_RESCHEDULE';

export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type JobStatus = 'PENDING' | 'PROCESSING' | 'SENT' | 'FAILED' | 'RETRYING';

export type AIStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export type HoldStatus = 'ACTIVE' | 'EXPIRED' | 'CONSUMED';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PatientProfile {
  id: string;
  user_id: string;
  date_of_birth?: string;
  gender?: string;
  blood_group?: string;
  allergies?: string[];
  medical_conditions?: string[];
  emergency_contact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Specialization {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
}

export interface Hospital {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code?: string;
  phone: string;
  email: string;
  website?: string;
  logo_url?: string;
  cover_image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DoctorProfile {
  id: string;
  user_id: string;
  medical_registration_number: string;
  specialization_id?: string;
  specialization?: Specialization;
  qualification: string;
  years_experience: number;
  bio?: string;
  languages?: string[];
  consultation_fee: number;
  approval_status: ApprovalStatus;
  slot_duration: number; // in minutes
  buffer_minutes: number; // in minutes
  max_daily_appointments: number;
  created_at: string;
  updated_at: string;
  profile?: Profile;
  hospitals?: Hospital[];
}

export interface DoctorHospital {
  id: string;
  doctor_id: string;
  hospital_id: string;
  department: string;
  is_primary: boolean;
  created_at: string;
  hospital?: Hospital;
}

export interface DoctorAvailability {
  id: string;
  doctor_id: string;
  day_of_week: number; // 0=Sunday, 6=Saturday
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  created_at?: string;
}

export interface DoctorLeave {
  id: string;
  doctor_id: string;
  start_date: string;
  end_date: string;
  reason?: string;
  status: LeaveStatus;
  created_at: string;
}

export interface AIPreVisitSummary {
  urgency_level: 'Low' | 'Medium' | 'High';
  chief_complaint: string;
  concise_summary: string;
  suggested_questions: string[];
}

export interface AIPostVisitSummary {
  visit_summary: string;
  important_findings: string[];
  medication_schedule: {
    medicine: string;
    dosage: string;
    frequency: string;
  }[];
  care_instructions: string[];
  follow_up_steps: string[];
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  hospital_id: string;
  appointment_start: string;
  appointment_end: string;
  status: AppointmentStatus;
  symptoms: string;
  symptom_duration?: string;
  symptom_severity?: string;
  additional_notes?: string;
  medical_document_url?: string;
  pre_visit_summary?: AIPreVisitSummary | null;
  pre_visit_ai_status?: AIStatus;
  consultation_notes?: string;
  diagnosis?: string;
  post_visit_summary?: AIPostVisitSummary | null;
  post_visit_ai_status?: AIStatus;
  follow_up_date?: string;
  google_patient_event_id?: string;
  google_doctor_event_id?: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  patient?: Profile;
  patient_details?: PatientProfile;
  doctor?: DoctorProfile;
  hospital?: Hospital;
  prescription?: Prescription;
}

export interface SlotHold {
  id: string;
  doctor_id: string;
  patient_id: string;
  hospital_id: string;
  start_time: string;
  end_time: string;
  expires_at: string;
  status: HoldStatus;
  created_at: string;
}

export interface PrescriptionItem {
  id: string;
  prescription_id: string;
  medicine_name: string;
  dosage: string;
  frequency: string;
  instructions?: string;
  start_date: string;
  end_date: string;
}

export interface Prescription {
  id: string;
  appointment_id: string;
  doctor_id: string;
  patient_id: string;
  notes?: string;
  created_at: string;
  items?: PrescriptionItem[];
}

export interface MedicationReminder {
  id: string;
  prescription_item_id: string;
  patient_id: string;
  reminder_time: string;
  next_run_at: string;
  status: JobStatus;
  retry_count: number;
  last_error?: string;
  created_at: string;
  prescription_item?: PrescriptionItem;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface TimeSlot {
  start_time: string; // ISO string
  end_time: string; // ISO string
  display_time: string; // "09:00 AM"
  is_available: boolean;
  reason?: string; // "Booked", "Held", "On Leave", "Past"
}

export interface DoctorSearchFilters {
  query?: string;
  specialization_id?: string;
  hospital_id?: string;
  location?: string;
  min_experience?: number;
  max_fee?: number;
  available_today?: boolean;
}
