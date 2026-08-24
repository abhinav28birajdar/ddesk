'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Stethoscope, User, Calendar, Bell, Menu, X, Shield, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UserRole } from '@/types';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole | 'GUEST'>('PATIENT');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRoleSwitch = (role: UserRole | 'GUEST') => {
    setActiveRole(role);
    setDropdownOpen(false);
    if (role === 'PATIENT') router.push('/patient/dashboard');
    else if (role === 'DOCTOR') router.push('/doctor/dashboard');
    else if (role === 'ADMIN') router.push('/admin/dashboard');
    else router.push('/');
  };

  const navLinks = [
    { href: '/doctors', label: 'Find Doctors' },
    { href: '/hospitals', label: 'Hospitals' },
    { href: '/specializations', label: 'Specializations' },
    { href: '/how-it-works', label: 'How it Works' },
    { href: '/about', label: 'About' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 text-sky-600 font-bold text-xl tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white shadow-sm">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="text-slate-900 font-extrabold text-2xl">Ddesk<span className="text-sky-600">.</span></span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-sky-600 ${
                  isActive ? 'text-sky-600 font-semibold' : 'text-slate-600'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE ROLE SELECTOR & ACTION BUTTONS */}
        <div className="hidden md:flex items-center gap-3">

          {/* DEMO ROLE SWITCHER */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span className="text-slate-400">Role:</span>
              <Badge variant={activeRole === 'DOCTOR' ? 'success' : activeRole === 'ADMIN' ? 'warning' : 'default'}>
                {activeRole}
              </Badge>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Portal Role
                </div>
                <button
                  onClick={() => handleRoleSwitch('PATIENT')}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <User className="h-4 w-4 text-sky-500" /> Patient Portal
                </button>
                <button
                  onClick={() => handleRoleSwitch('DOCTOR')}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Stethoscope className="h-4 w-4 text-emerald-500" /> Doctor Portal
                </button>
                <button
                  onClick={() => handleRoleSwitch('ADMIN')}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Shield className="h-4 w-4 text-amber-500" /> Admin Portal
                </button>
                <div className="my-1 border-t border-slate-100" />
                <button
                  onClick={() => handleRoleSwitch('GUEST')}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4 text-slate-400" /> Logout / Guest View
                </button>
              </div>
            )}
          </div>

          {activeRole === 'GUEST' ? (
            <>
              <Link href="/auth/patient/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/auth/patient/register">
                <Button size="sm">Book Appointment</Button>
              </Link>
            </>
          ) : (
            <Link href={`/${activeRole.toLowerCase()}/dashboard`}>
              <Button size="sm" className="gap-2">
                <Calendar className="h-4 w-4" /> Go to Portal
              </Button>
            </Link>
          )}

        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link href="/auth/patient/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">Patient Login</Button>
            </Link>
            <Link href="/auth/doctor/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" className="w-full">Doctor Login</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
