'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronLeft,
  Globe2,
  GraduationCap,
  Headphones,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
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
    : '/login'

  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-800 flex flex-col font-sans antialiased">
      
      {/* Modern Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-all shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 text-white font-black text-xl shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <span>ن</span>
            </div>
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">نخلة</span>
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
                {isAuthenticated ? 'لوحة التحكم' : 'دخول'}
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href={dashboardTarget}>
              <Button size="sm" className="h-9 px-3 text-xs font-bold">
                {isAuthenticated ? 'لوحتي' : 'دخول'}
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
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6 sm:px-6 lg:px-8 sm:py-10 animate-slide-up">
        {children}
      </main>

      {/* Ultra-Luxury Saudi Royal Footer Section */}
      <footer className="relative w-full bg-gradient-to-b from-[#06241e] via-[#041a15] to-[#02100d] text-white mt-auto overflow-hidden border-t border-emerald-600/30 shadow-2xl">
        
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        {/* Top VIP Pre-Footer Call to Action Banner */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-6">
          <div className="relative rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-900/90 via-[#0a352c] to-emerald-950/95 p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-5 text-center lg:text-right">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-3 py-0.5 text-[11px] font-black text-amber-300 border border-amber-400/30">
                  <Sparkles size={13} className="text-amber-400" />
                  <span>انضم إلى منصة نخلة المهنية</span>
                </div>
                <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                  جاهز للانطلاق نحو فرصتك القادمة؟
                </h3>
                <p className="text-[11px] sm:text-xs lg:text-sm text-emerald-100/80 leading-relaxed">
                  سواء كنت باحثاً طموحاً أو منشأة أعمال تبحث عن كفاءات استثنائية، نخلة توفر لك كل ما تحتاجه.
                </p>
              </div>

              {/* Action Buttons - Horizontal on mobile */}
              <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto sm:flex sm:items-center">
                <Link href="/register" onClick={() => setDevAuthPreviewRole('seeker')} className="w-full sm:w-auto">
                  <Button
                    size="md"
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black shadow-md shadow-amber-500/20 text-xs"
                    trailingIcon={<ArrowLeft size={14} className="hidden sm:inline" />}
                  >
                    باحث عن عمل
                  </Button>
                </Link>

                <Link href="/register" onClick={() => setDevAuthPreviewRole('company')} className="w-full sm:w-auto">
                  <Button
                    size="md"
                    variant="secondary"
                    className="w-full border-emerald-400/40 bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900 hover:text-white text-xs"
                  >
                    منشأة أعمال
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Main Footer Topics & Brand Row */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          
          {/* Brand Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-8 mb-8 border-b border-emerald-700/50">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-300 text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/20 border border-amber-300/40">
                ن
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-white tracking-tight">نخلة</span>
                  <span className="rounded-full bg-emerald-500/25 px-2.5 py-0.5 text-[10px] font-black text-emerald-300 border border-emerald-400/40 shadow-xs">
                    سعودية 🇸🇦
                  </span>
                </div>
                <p className="text-xs text-emerald-200/90 font-medium">منصة التوظيف والتأهيل والتعهيد المهني المعتمدة</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-900/80 px-3 py-1.5 text-xs font-bold text-emerald-100 border border-emerald-600/60 shadow-sm backdrop-blur-md">
                <ShieldCheck size={15} className="text-amber-400" />
                <span>مرخصة وموثقة 🇸🇦</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-900/80 px-3 py-1.5 text-xs font-bold text-emerald-100 border border-emerald-600/60 shadow-sm backdrop-blur-md">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>معتمدة رسمياً</span>
              </div>
            </div>
          </div>

          {/* Prominent Topics Grid (2 columns on mobile, 4 columns on desktop) */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-8 lg:grid-cols-4 lg:gap-10">
            
            {/* Topic 1: لوحات التحكم */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 border-b border-emerald-700/60 pb-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300">
                  لوحات التحكم
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-100">
                <li>
                  <Link href="/seeker/dashboard" onClick={() => setDevAuthPreviewRole('seeker')} className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>لوحة الباحث</span>
                  </Link>
                </li>
                <li>
                  <Link href="/company/dashboard" onClick={() => setDevAuthPreviewRole('company')} className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>لوحة الشركات</span>
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>سوق الوظائف</span>
                  </Link>
                </li>
                <li>
                  <Link href="/seeker/training" className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>المسار التدريبي</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Topic 2: خدمات المنصة */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 border-b border-emerald-700/60 pb-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300">
                  خدمات المنصة
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-100">
                <li>
                  <Link href="/pricing" className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>باقات الأسعار</span>
                  </Link>
                </li>
                <li>
                  <Link href="/company/outsourcing-requests" className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>التعهيد المهني</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>الأسئلة الشائعة</span>
                  </Link>
                </li>
                <li>
                  <Link href="/interviews" className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>المقابلات الذكية</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Topic 3: القانونية والأمان */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 border-b border-emerald-700/60 pb-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300">
                  القانونية والأمان
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-100">
                <li>
                  <Link href="/legal/privacy" className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>سياسة الخصوصية</span>
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>الشروط والأحكام</span>
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>حماية البيانات</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="group flex items-center gap-1.5 hover:text-amber-300 transition-colors py-0.5">
                    <ChevronLeft size={15} className="text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>معايير الامتثال</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Topic 4: التواصل والدعم */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 border-b border-emerald-700/60 pb-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300">
                  التواصل والدعم
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-100">
                <li className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-900/90 text-amber-300 border border-emerald-600/60 shadow-xs shrink-0">
                    <MapPin size={14} />
                  </div>
                  <span className="truncate">الرياض، المملكة العربية السعودية</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-900/90 text-amber-300 border border-emerald-600/60 shadow-xs shrink-0">
                    <Mail size={14} />
                  </div>
                  <span className="font-sans text-xs sm:text-sm tracking-wide">support@nakhlah.sa</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-900/90 text-emerald-300 border border-emerald-600/60 shadow-xs shrink-0">
                    <Globe2 size={14} />
                  </div>
                  <span className="font-sans text-xs sm:text-sm tracking-wide">www.nakhlah.sa</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright and Saudi Flag Ribbon */}
          <div className="mt-10 pt-6 border-t border-emerald-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right text-xs text-emerald-200/80 font-medium">
            <p>جميع الحقوق محفوظة © {new Date().getFullYear()} منصة نخلة للتوظيف والتأهيل المهني.</p>
            <span className="text-xs font-black text-amber-300 bg-emerald-950/90 px-4 py-1.5 rounded-full border border-emerald-600/70 shadow-inner">
              المملكة العربية السعودية 🇸🇦
            </span>
          </div>

        </div>
      </footer>

    </div>
  )
}
