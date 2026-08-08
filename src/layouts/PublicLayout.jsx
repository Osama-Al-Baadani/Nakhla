'use client'

import { useState } from 'react'
import {
  Building2,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { publicNavItems } from '../lib/public-content'
import { cn } from '../lib/cn'
import { getDefaultDashboardPath } from '../lib/roles'
import { setDevAuthPreviewRole } from '../lib/dev-auth'

export function PublicLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, role, isDevAuthBypassEnabled } = useAuth()

  const dashboardTarget = isAuthenticated || isDevAuthBypassEnabled
    ? getDefaultDashboardPath(role)
    : '/seeker/dashboard'

  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-800 flex flex-col font-sans antialiased">
      
      {/* Clean Modern Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-all shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          
          {/* Brand Logo - Clean 'نخلة' ready for custom image logo */}
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="font-serif text-2xl sm:text-3xl font-black text-emerald-800 tracking-tight transition-colors group-hover:text-emerald-700">
              نخلة
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100/70 p-1 lg:flex">
            {publicNavItems.map((item) => {
              const isActive = pathname === item.to

              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-150',
                    isActive
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <Link
              href="/seeker/dashboard"
              onClick={() => setDevAuthPreviewRole('seeker')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50/70 px-3.5 py-2 text-xs font-black text-emerald-800 hover:bg-emerald-100/80 active:scale-95 transition-all shadow-2xs"
            >
              <UserCheck size={15} className="text-emerald-700" />
              <span>لوحة الباحث</span>
            </Link>

            <Link
              href="/company/dashboard"
              onClick={() => setDevAuthPreviewRole('company')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200/80 bg-amber-50/70 px-3.5 py-2 text-xs font-black text-amber-900 hover:bg-amber-100/80 active:scale-95 transition-all shadow-2xs"
            >
              <Building2 size={15} className="text-amber-600" />
              <span>لوحة الشركة</span>
            </Link>

            <Link href={dashboardTarget}>
              <Button size="md" className="font-bold shadow-md shadow-emerald-700/20" leadingIcon={<Sparkles size={16} />}>
                دخول المنصة
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href={dashboardTarget}>
              <Button size="sm" className="h-9 px-3 text-xs font-bold">
                دخول
              </Button>
            </Link>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 active:scale-95 transition-all"
              aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white/95 backdrop-blur-2xl lg:hidden animate-slide-up shadow-2xl">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
              
              <div className="grid grid-cols-2 gap-2.5 mb-2 pb-3 border-b border-slate-100">
                <Link
                  href="/seeker/dashboard"
                  onClick={() => {
                    setDevAuthPreviewRole('seeker')
                    setMobileOpen(false)
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-black text-emerald-800 active:scale-95 transition-all"
                >
                  <UserCheck size={16} />
                  <span>لوحة الباحث</span>
                </Link>

                <Link
                  href="/company/dashboard"
                  onClick={() => {
                    setDevAuthPreviewRole('company')
                    setMobileOpen(false)
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs font-black text-amber-900 active:scale-95 transition-all"
                >
                  <Building2 size={16} />
                  <span>لوحة الشركة</span>
                </Link>
              </div>

              {publicNavItems.map((item) => {
                const isActive = pathname === item.to

                return (
                  <Link
                    key={`mobile-${item.to}`}
                    href={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'rounded-xl px-4 py-2.5 text-xs font-extrabold transition-colors',
                      isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}

              <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 mt-2">
                <Link href={dashboardTarget} onClick={() => setMobileOpen(false)}>
                  <Button className="w-full font-bold">دخول اللوحة الرئيسية</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Container */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6 sm:px-6 sm:py-10 animate-slide-up">
        {children}
      </main>

      {/* Clean, Elegant, Highly-Organized Footer */}
      <footer className="border-t border-slate-200/90 bg-white text-slate-800 mt-auto pb-28 pt-10 sm:pb-8 sm:pt-14 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          
          <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-3">
              <Link href="/" className="inline-block">
                <span className="font-serif text-2xl sm:text-3xl font-black text-emerald-800 tracking-tight">
                  نخلة
                </span>
              </Link>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 max-w-sm font-medium">
                المنصة الرقمية السعودية للتوظيف والتأهيل والعمل عن بُعد والتعهيد المهني.
              </p>
            </div>

            {/* Column 2: Dashboard Links */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                لوحات التحكم
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 font-bold">
                <li>
                  <Link href="/seeker/dashboard" onClick={() => setDevAuthPreviewRole('seeker')} className="hover:text-emerald-700 transition-colors block">
                    لوحة الباحث عن عمل
                  </Link>
                </li>
                <li>
                  <Link href="/company/dashboard" onClick={() => setDevAuthPreviewRole('company')} className="hover:text-amber-600 transition-colors block">
                    لوحة قطاع الأعمال
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-emerald-700 transition-colors block">
                    استعراض الوظائف
                  </Link>
                </li>
                <li>
                  <Link href="/seeker/training" className="hover:text-emerald-700 transition-colors block">
                    المسار التدريبي
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                معلومات المنصة
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 font-bold">
                <li>
                  <Link href="/pricing" className="hover:text-emerald-700 transition-colors block">
                    الأسعار والاشتراكات
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-emerald-700 transition-colors block">
                    الأسئلة الشائعة
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="hover:text-emerald-700 transition-colors block">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="hover:text-emerald-700 transition-colors block">
                    الشروط والأحكام
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                التواصل والدعم
              </h3>
              <div className="space-y-2 text-xs text-slate-600 font-bold">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-emerald-700 shrink-0" />
                  <span>الرياض، المملكة العربية السعودية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-amber-600 shrink-0" />
                  <span>support@nakhlah.sa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 size={15} className="text-emerald-700 shrink-0" />
                  <span>www.nakhlah.sa</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Footer Bar */}
          <div className="mt-10 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right text-xs text-slate-500 font-medium">
            <p>جميع الحقوق محفوظة © {new Date().getFullYear()} منصة نخلة</p>
            <p className="text-[11px] font-bold text-slate-400">
              المملكة العربية السعودية 🇸🇦
            </p>
          </div>

        </div>
      </footer>

    </div>
  )
}
