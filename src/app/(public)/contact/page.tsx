'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-12 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="default">Get in Touch</Badge>
          <h1 className="text-3xl font-extrabold text-slate-900">Contact Ddesk Support</h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Have questions about doctor onboarding, patient accounts, or clinic integration?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 text-xs text-slate-600">
            <Card className="p-4 border-slate-200">
              <MapPin className="h-5 w-5 text-sky-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Headquarters</h3>
              <p>100 Health Plaza, Suite 400<br />New York, NY 10001</p>
            </Card>
            <Card className="p-4 border-slate-200">
              <Phone className="h-5 w-5 text-sky-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Phone Support</h3>
              <p>+1 (800) 555-DDESK<br />Mon-Fri 8am-6pm EST</p>
            </Card>
            <Card className="p-4 border-slate-200">
              <Mail className="h-5 w-5 text-sky-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Email Inquiries</h3>
              <p>support@ddesk.com<br />partnerships@ddesk.com</p>
            </Card>
          </div>

          <Card className="md:col-span-2 p-6 bg-white border border-slate-200">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-500">Our support team will respond within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input required type="text" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input required type="email" className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message</label>
                  <textarea required rows={4} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm" placeholder="How can we help you?" />
                </div>
                <Button type="submit" className="w-full font-bold gap-2">
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
