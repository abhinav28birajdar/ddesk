# Ddesk — Smart Healthcare Appointment & Follow-up Management

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-emerald?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

**Ddesk** is a production-quality full-stack healthcare appointment and follow-up management platform built with Next.js App Router, TypeScript, Supabase PostgreSQL, and modern AI/calendar abstractions.

---

## Table of Contents
1. [Key Features](#key-features)
2. [Architecture Overview](#architecture-overview)
3. [Installation & Local Setup](#installation--local-setup)
4. [Supabase Database Setup](#supabase-database-setup)
5. [Integrations Setup (AI, Email, Google Calendar)](#integrations-setup)
6. [Database Schema Reference](#database-schema-reference)
7. [API Endpoint Documentation](#api-endpoint-documentation)
8. [Testing & Concurrency Verification](#testing--concurrency-verification)

---

## Key Features

- **Role-Based Access Portals**:
  - **Patient Portal**: Centralized doctor discovery, multi-step symptom booking, AI pre-visit summary previews, digital prescription records, active medication reminder schedules, and in-app notifications.
  - **Doctor Portal**: Daily appointment timeline, Next patient spotlight with AI urgency levels & chief complaints, multi-range availability configurator, leave management with conflict alerts, and digital consultation notes.
  - **Admin Portal**: Platform KPI metrics, doctor registration approval/rejection workflows, hospital directory management, appointment auditing, and retry job status monitoring.
- **Double Booking Prevention**: Database transaction-level locking via PostgreSQL advisory locks (`pg_advisory_xact_lock`) and range exclusion constraints preventing simultaneous overlapping bookings.
- **5-Minute Slot Hold Mechanism**: Temporary hold creation blocking concurrent users while a patient completes symptoms and review.
- **Doctor Leave Conflict Mitigation**: Detects overlapping confirmed appointments when a doctor submits leave, transitions status to `NEEDS_RESCHEDULE`, and dispatches patient notifications.
- **Polymorphic AI Provider**: Configurable support for OpenAI and Google Gemini with schema validation for pre-visit and post-visit summaries.
- **Resilient Retry Architecture**: External service dispatches (AI, Email via Resend, Google Calendar OAuth) fail gracefully into retry queue tables (`notification_jobs`, `ai_processing_jobs`, `medication_reminders`) with exponential backoff.

---

## Architecture Overview

```text
                               ┌─────────────────────────┐
                               │     Next.js 16 App      │
                               │  (React 19, TypeScript) │
                               └────────────┬────────────┘
                                            │
           ┌────────────────────────────────┼────────────────────────────────┐
           ▼                                ▼                                ▼
┌─────────────────────┐          ┌─────────────────────┐          ┌─────────────────────┐
│ Supabase PostgreSQL │          │  AI Provider Abstr. │          │  Integrations Engine│
│   (Tables & RLS)    │          │  (Gemini / OpenAI)  │          │(Resend / Google Cal)│
└─────────────────────┘          └─────────────────────┘          └─────────────────────┘
```

---

## Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/abhinav28birajdar/ddesk.git
cd ddesk

# 2. Install dependencies
npm install

# 3. Environment configuration
cp .env.example .env.local

# 4. Start Next.js dev server
npm run dev
```

Visit `http://localhost:3000` to access Ddesk.

---

## Supabase Database Setup

1. Create a new project in [Supabase](https://supabase.com/).
2. Copy your Project URL and Anon Key into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Run migrations located in `supabase/migrations/` in sequential order:
   - `00001_initial_schema.sql`
   - `00002_concurrency_and_rls.sql`
   - `00003_seed_data.sql`

---

## Integrations Setup

### 1. AI Provider (Gemini / OpenAI)
Set `AI_PROVIDER` to `gemini` or `openai` in `.env.local`:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```

### 2. Email Provider (Resend)
Set `EMAIL_PROVIDER` to `resend` and specify API key:
```env
EMAIL_PROVIDER=resend
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=Ddesk Health <notifications@ddesk.com>
```

### 3. Google Calendar OAuth 2.0
Create OAuth 2.0 Credentials in Google Cloud Console with redirect URI `http://localhost:3000/api/calendar/callback`:
```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/calendar/callback
```

---

## Database Schema Reference

| Table Name | Description | Key Foreign Keys |
|---|---|---|
| `profiles` | Base user account details & roles | `auth.users(id)` |
| `patient_profiles` | Medical conditions, allergies, emergency contacts | `profiles(id)` |
| `doctor_profiles` | Medical registration number, fees, approval status | `profiles(id)` |
| `hospitals` | Hospital and clinic location records | - |
| `doctor_hospitals` | Junction linking doctors to multiple hospitals | `doctor_profiles`, `hospitals` |
| `doctor_availability` | Multi-range daily working hours | `doctor_profiles` |
| `doctor_leaves` | Approved doctor leave dates | `doctor_profiles` |
| `appointments` | Central booking records with pre/post AI summaries | `profiles`, `doctor_profiles`, `hospitals` |
| `slot_holds` | 5-minute temporary checkout holds | `doctor_profiles`, `profiles` |
| `prescriptions` | Digital prescription headers | `appointments` |
| `prescription_items` | Individual prescribed medicines & dosages | `prescriptions` |
| `medication_reminders` | Scheduled patient reminder triggers | `prescription_items` |
| `notification_jobs` | Background email & push retry queue | `profiles` |

---

## API Endpoint Documentation

### Appointments API
- `POST /api/appointments/hold`: Creates 5-minute temporary slot hold.
  - **Body**: `{ doctorId, patientId, hospitalId, start, end }`
- `POST /api/appointments/create`: Executes atomic appointment booking.
  - **Body**: `{ patientId, doctorId, hospitalId, start, end, symptoms, symptomDuration, symptomSeverity }`

### Background Jobs & Worker API
- `GET /api/jobs/process`: Triggers background worker processing pending AI summaries, notification retries, and medication reminders.

---

## Testing & Concurrency Verification

Run unit and integration tests verifying double-booking rejection, temporary slot hold expiration, and leave conflict mitigations:
```bash
npm test
```
