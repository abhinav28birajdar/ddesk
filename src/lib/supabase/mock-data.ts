import {
  Hospital,
  Specialization,
  DoctorProfile,
  Profile,
  Appointment,
  NotificationItem,
  Prescription,
  DoctorAvailability,
  DoctorLeave
} from '@/types';

export const MOCK_SPECIALIZATIONS: Specialization[] = [
  { id: 's1', name: 'Cardiologist', description: 'Heart and cardiovascular system specialist' },
  { id: 's2', name: 'Dermatologist', description: 'Skin, hair, and nail specialist' },
  { id: 's3', name: 'General Physician', description: 'Primary medical care and overall health' },
  { id: 's4', name: 'Neurologist', description: 'Brain, spinal cord, and nerve disorders' },
  { id: 's5', name: 'Orthopedic', description: 'Bones, joints, ligaments, and tendons specialist' },
  { id: 's6', name: 'Pediatrician', description: 'Infant, child, and adolescent healthcare' },
  { id: 's7', name: 'Dentist', description: 'Oral health, teeth, and gums specialist' },
  { id: 's8', name: 'Psychiatrist', description: 'Mental health and emotional disorders' },
  { id: 's9', name: 'Gynecologist', description: 'Female reproductive health specialist' },
  { id: 's10', name: 'ENT Specialist', description: 'Ear, nose, and throat conditions' },
  { id: 's11', name: 'Ophthalmologist', description: 'Eye care and vision surgery specialist' },
  { id: 's12', name: 'Gastroenterologist', description: 'Digestive system and stomach specialist' },
  { id: 's13', name: 'Pulmonologist', description: 'Lungs and respiratory system specialist' },
  { id: 's14', name: 'Endocrinologist', description: 'Hormones and metabolic disorders' },
  { id: 's15', name: 'Urologist', description: 'Urinary tract and male reproductive system' }
];

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'City General Hospital',
    description: 'Leading multi-specialty regional hospital with state-of-the-art ICU and surgical suites.',
    address: '100 Medical Center Way',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    postal_code: '10001',
    phone: '+1 (212) 555-0100',
    email: 'info@citygeneral.org',
    website: 'https://citygeneral.example.com',
    logo_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300',
    cover_image_url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'h2',
    name: 'St. Jude Health & Wellness Center',
    description: 'Comprehensive compassionate healthcare center specializing in family care, pediatrics, and cardiology.',
    address: '250 Healthcare Blvd',
    city: 'Boston',
    state: 'MA',
    country: 'USA',
    postal_code: '02115',
    phone: '+1 (617) 555-0200',
    email: 'contact@stjudehealth.org',
    website: 'https://stjudehealth.example.com',
    logo_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=300',
    cover_image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'h3',
    name: 'Apex Heart & Specialty Clinic',
    description: 'Dedicated cardiac care and vascular surgery facility equipped with modern cath labs.',
    address: '50 Cardiac Plaza',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    postal_code: '94103',
    phone: '+1 (415) 555-0300',
    email: 'care@apexheart.org',
    website: 'https://apexheart.example.com',
    logo_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300',
    cover_image_url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1000',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'h4',
    name: 'Sunrise Children Hospital',
    description: 'Premier pediatric healthcare hospital providing pediatric emergency and neonatal ICU services.',
    address: '75 Sunshine Ave',
    city: 'Chicago',
    state: 'IL',
    country: 'USA',
    postal_code: '60611',
    phone: '+1 (312) 555-0400',
    email: 'kids@sunrisechildren.org',
    website: 'https://sunrisechildren.example.com',
    logo_url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300',
    cover_image_url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'h5',
    name: 'Metropolitan Orthopedic Institute',
    description: 'Specialized center for joint replacement, sports medicine, and spinal care.',
    address: '400 Bone & Joint Way',
    city: 'Seattle',
    state: 'WA',
    country: 'USA',
    postal_code: '98101',
    phone: '+1 (206) 555-0500',
    email: 'appointments@metroortho.org',
    website: 'https://metroortho.example.com',
    logo_url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=300',
    cover_image_url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1000',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const MOCK_PROFILES: Profile[] = [
  {
    id: 'doc-user-1',
    role: 'DOCTOR',
    full_name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@ddesk.com',
    phone: '+1 (555) 234-5678',
    avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'doc-user-2',
    role: 'DOCTOR',
    full_name: 'Dr. Robert Chen',
    email: 'robert.chen@ddesk.com',
    phone: '+1 (555) 345-6789',
    avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'doc-user-3',
    role: 'DOCTOR',
    full_name: 'Dr. Emily Alva',
    email: 'emily.alva@ddesk.com',
    phone: '+1 (555) 456-7890',
    avatar_url: 'https://images.unsplash.com/photo-1594824813566-7885a3961c01?w=300',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'pat-user-1',
    role: 'PATIENT',
    full_name: 'John Miller',
    email: 'john.miller@example.com',
    phone: '+1 (555) 987-6543',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'admin-user-1',
    role: 'ADMIN',
    full_name: 'System Admin',
    email: 'admin@ddesk.com',
    phone: '+1 (555) 000-1111',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const MOCK_DOCTORS: DoctorProfile[] = [
  {
    id: 'd1',
    user_id: 'doc-user-1',
    medical_registration_number: 'MD-889021',
    specialization_id: 's1',
    specialization: MOCK_SPECIALIZATIONS[0],
    qualification: 'MD, FACC - Harvard Medical School',
    years_experience: 14,
    bio: 'Dr. Sarah Jenkins is a board-certified Cardiologist with over 14 years of experience in invasive cardiology, heart failure prevention, and hypertension management.',
    languages: ['English', 'Spanish'],
    consultation_fee: 150,
    approval_status: 'APPROVED',
    slot_duration: 30,
    buffer_minutes: 10,
    max_daily_appointments: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile: MOCK_PROFILES[0],
    hospitals: [MOCK_HOSPITALS[0], MOCK_HOSPITALS[2]]
  },
  {
    id: 'd2',
    user_id: 'doc-user-2',
    medical_registration_number: 'MD-774012',
    specialization_id: 's2',
    specialization: MOCK_SPECIALIZATIONS[1],
    qualification: 'MD, FAAD - Johns Hopkins University',
    years_experience: 10,
    bio: 'Dr. Robert Chen specializes in clinical dermatology, skin cancer screening, acne therapeutics, and laser surgery treatments.',
    languages: ['English', 'Mandarin'],
    consultation_fee: 120,
    approval_status: 'APPROVED',
    slot_duration: 30,
    buffer_minutes: 10,
    max_daily_appointments: 20,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile: MOCK_PROFILES[1],
    hospitals: [MOCK_HOSPITALS[0]]
  },
  {
    id: 'd3',
    user_id: 'doc-user-3',
    medical_registration_number: 'MD-991044',
    specialization_id: 's6',
    specialization: MOCK_SPECIALIZATIONS[5],
    qualification: 'MD, FAAP - Stanford Medicine',
    years_experience: 12,
    bio: 'Dr. Emily Alva is a pediatric expert focused on child growth tracking, immunization schedules, and adolescent health.',
    languages: ['English'],
    consultation_fee: 130,
    approval_status: 'APPROVED',
    slot_duration: 30,
    buffer_minutes: 10,
    max_daily_appointments: 18,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile: MOCK_PROFILES[2],
    hospitals: [MOCK_HOSPITALS[1], MOCK_HOSPITALS[3]]
  }
];

export const MOCK_AVAILABILITY: DoctorAvailability[] = [
  { id: 'av1', doctor_id: 'd1', day_of_week: 1, start_time: '09:00', end_time: '13:00' }, // Monday Morning
  { id: 'av2', doctor_id: 'd1', day_of_week: 1, start_time: '14:00', end_time: '18:00' }, // Monday Afternoon
  { id: 'av3', doctor_id: 'd1', day_of_week: 2, start_time: '09:00', end_time: '13:00' }, // Tuesday
  { id: 'av4', doctor_id: 'd1', day_of_week: 3, start_time: '09:00', end_time: '13:00' }, // Wednesday
  { id: 'av5', doctor_id: 'd1', day_of_week: 4, start_time: '14:00', end_time: '18:00' }, // Thursday
  { id: 'av6', doctor_id: 'd1', day_of_week: 5, start_time: '09:00', end_time: '13:00' }, // Friday
  { id: 'av7', doctor_id: 'd2', day_of_week: 1, start_time: '10:00', end_time: '16:00' },
  { id: 'av8', doctor_id: 'd2', day_of_week: 3, start_time: '10:00', end_time: '16:00' },
  { id: 'av9', doctor_id: 'd3', day_of_week: 2, start_time: '09:00', end_time: '15:00' }
];

export const MOCK_LEAVES: DoctorLeave[] = [
  {
    id: 'l1',
    doctor_id: 'd1',
    start_date: '2026-09-01',
    end_date: '2026-09-03',
    reason: 'Attending Cardiology Medical Conference',
    status: 'APPROVED',
    created_at: new Date().toISOString()
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    patient_id: 'pat-user-1',
    doctor_id: 'd1',
    hospital_id: 'h1',
    appointment_start: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    appointment_end: new Date(Date.now() + 86400000 + 1800000).toISOString(),
    status: 'CONFIRMED',
    symptoms: 'Recurring chest tightness during mild workouts and occasional dizziness.',
    symptom_duration: '3 weeks',
    symptom_severity: 'Moderate',
    additional_notes: 'Family history of hypertension.',
    pre_visit_summary: {
      urgency_level: 'Medium',
      chief_complaint: 'Exertional chest tightness and dizziness',
      concise_summary: 'Patient reports exertional chest discomfort lasting 3 weeks with lightheadedness.',
      suggested_questions: [
        'Do symptoms radiate to arms or jaw?',
        'Does rest relieve the chest tightness?',
        'Have you taken any anti-hypertensive medication?'
      ]
    },
    pre_visit_ai_status: 'SUCCESS',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    patient: MOCK_PROFILES[3],
    doctor: MOCK_DOCTORS[0],
    hospital: MOCK_HOSPITALS[0]
  },
  {
    id: 'apt-102',
    patient_id: 'pat-user-1',
    doctor_id: 'd2',
    hospital_id: 'h1',
    appointment_start: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    appointment_end: new Date(Date.now() - 86400000 * 5 + 1800000).toISOString(),
    status: 'COMPLETED',
    symptoms: 'Persistent skin rash on elbows with mild itching.',
    symptom_duration: '1 month',
    symptom_severity: 'Low',
    pre_visit_summary: {
      urgency_level: 'Low',
      chief_complaint: 'Pruritic rash on bilateral elbows',
      concise_summary: 'Patient describes mild itchy papules localized to extensor surfaces of elbows.',
      suggested_questions: [
        'Have you used new detergents or soaps?',
        'Is there joint pain associated?',
        'Any personal or family history of psoriasis?'
      ]
    },
    pre_visit_ai_status: 'SUCCESS',
    consultation_notes: 'Mild localized eczema. Advised gentle topical moisturizers and short hydrocortisone course.',
    diagnosis: 'Atopic Dermatitis (Mild)',
    post_visit_summary: {
      visit_summary: 'You consulted Dr. Robert Chen regarding dry, itchy skin rash on your elbows.',
      important_findings: ['Skin lesions are superficial and show no signs of secondary infection.'],
      medication_schedule: [
        {
          medicine: 'Hydrocortisone 1% Cream',
          dosage: 'Pea-sized amount',
          frequency: 'Twice daily for 7 days'
        }
      ],
      care_instructions: [
        'Avoid hot showers and harsh soaps',
        'Apply fragrance-free moisturizing lotion immediately after bathing'
      ],
      follow_up_steps: ['Return in 3 weeks if rash persists or worsens']
    },
    post_visit_ai_status: 'SUCCESS',
    follow_up_date: '2026-09-15',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    patient: MOCK_PROFILES[3],
    doctor: MOCK_DOCTORS[1],
    hospital: MOCK_HOSPITALS[0]
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    user_id: 'pat-user-1',
    type: 'APPOINTMENT_BOOKED',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Sarah Jenkins is confirmed for tomorrow at 10:00 AM.',
    is_read: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'n2',
    user_id: 'doc-user-1',
    type: 'APPOINTMENT_BOOKED',
    title: 'New Patient Booking',
    message: 'John Miller booked an appointment for tomorrow at 10:00 AM.',
    is_read: true,
    created_at: new Date().toISOString()
  }
];
