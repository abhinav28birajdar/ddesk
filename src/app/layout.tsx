import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ddesk — Smart Healthcare Appointment & Follow-up Manager',
  description: 'Connect patients, doctors, and clinics with real-time slot booking, AI symptom summaries, digital prescriptions, and automated follow-ups.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
