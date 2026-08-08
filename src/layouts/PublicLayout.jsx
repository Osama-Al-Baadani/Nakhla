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
    : '/seeker/dashboard'

  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-800 flex flex-col font-sans antialiased">
      
      {/* Modern Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-all shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 text-white font-black text-xl shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <span>ن</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-serif text-xl sm:text-2xl font-black text-slate-900 leading-none">نخلة</h1>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 border border-emerald-200/60">سعودية 🇸🇦</span>
              </div>
              <p className="text-[10px] font-extrabold tracking-widest text-emerald-700 uppercase mt-0.5">منصة التوظيف والتأهيل</p>
            </div>
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
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6 sm:px-6 lg:px-8 sm:py-10 animate-slide-up">
        {children}
      </main>

      {/* Ultra-Luxury Saudi Royal Footer Section */}
      <footer className="relative w-full bg-[#051c17] text-white mt-auto overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        {/* Top VIP Pre-Footer Call to Action Banner */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
          <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-900/90 via-[#0a352c] to-emerald-950/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-right">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-black text-amber-300 border border-amber-400/30">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>انضم إلى مجتمع نخلة المهني</span>
                </div>
                <h3 className="font-serif text-xl sm:text-3xl font-black text-white tracking-tight">
                  جاهز للانطلاق نحو فرصتك الوظيفية القادمة؟
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  سواء كنت باحثاً طموحاً أو منشأة تبحث عن كوادر استثنائية، نخلة توفر لك الحل المتكامل بأسلوب سعودي مبتكر.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:shrink-0">
                <Link href="/register" onClick={() => setDevAuthPreviewRole('seeker')}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20"
                    trailingIcon={<ArrowLeft size={16} />}
                  >
                    تسجيل باحث عن عمل
                  </Button>
                </Link>

                <Link href="/register" onClick={() => setDevAuthPreviewRole('company')}>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="border-emerald-400/40 bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900 hover:text-white"
                  >
                    تسجيل منشأة أعمال
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Main Footer Links & Info Grid */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-t border-emerald-800/40">
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
            
            {/* Column 1: Brand & Mission */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20">
                  ن
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-2xl font-black text-white tracking-wide">نخلة</h2>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black text-emerald-300 border border-emerald-400/30">
                      سعودية 🇸🇦
                    </span>
                  </div>
                  <p className="text-[10px] font-extrabold tracking-widest text-amber-300 uppercase mt-0.5">
                    المنصة الوطنية للتوظيف والتأهيل
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-emerald-100/70 max-w-sm">
                المنظومة الرقمية الرائدة لربط الكفاءات الوطنية بالمنشآت المعتمدة، مع حلول متقدمة للعمل عن بُعد والتعهيد المهني.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-900/60 px-3 py-1.5 border border-emerald-700/50 text-[11px] font-bold text-emerald-200 shadow-xs">
                  <ShieldCheck size={14} className="text-amber-400" />
                  <span>منصة سعودية موثقة 🇸🇦</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-900/60 px-3 py-1.5 border border-emerald-700/50 text-[11px] font-bold text-emerald-200 shadow-xs">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>متوافقة مع الأنظمة</span>
                </div>
              </div>
            </div>

            {/* Column 2: Dashboard Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 border-b border-emerald-800/60 pb-2">
                لوحات التحكم
              </h4>
              <ul className="space-y-2 text-xs text-emerald-100/80 font-bold">
                <li>
                  <Link href="/seeker/dashboard" onClick={() => setDevAuthPreviewRole('seeker')} className="flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1">
                    <ChevronLeft size={14} className="text-emerald-500" />
                    <span>لوحة الباحث عن عمل</span>
                  </Link>
                </li>
                <li>
                  <Link href="/company/dashboard" onClick={() => setDevAuthPreviewRole('company')} className="flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1">
                    <ChevronLeft size={14} className="text-emerald-500" />
                    <span>لوحة قطاع الأعمال</span>
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1">
                    <ChevronLeft size={14} className="text-emerald-500" />
                    <span>سوق الوظائف الشاغرة</span>
                  </Link>
                </li>
                <li>
                  <Link href="/seeker/training" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1">
                    <ChevronLeft size={14} className="text-emerald-500" />
                    <span>المسار التدريبي والتأهيل</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 border-b border-emerald-800/60 pb-2">
                خدمات المنصة
              </h4>
              <ul className="space-y-2 text-xs text-emerald-100/80 font-bold">
                <li>
                  <Link href="/pricing" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1">
                    <ChevronLeft size={14} className="text-emerald-500" />
                    <span>باقات الاشتراك والأسعار</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1">
                    <ChevronLeft size={14} className="text-emerald-500" />
                    <span>الأسئلة الأكثر شيوعاً</span>
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1">
                    <ChevronLeft size={14} className="text-emerald-500" />
                    <span>سياسة الخصوصية وحماية البيانات</span>
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1">
                    <ChevronLeft size={14} className="text-emerald-500" />
                    <span>الشروط والأحكام العامة</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Direct Support */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 border-b border-emerald-800/60 pb-2">
                التواصل والدعم المباشر
              </h4>
              <div className="space-y-3 text-xs text-emerald-100/80 font-bold">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800/80 text-amber-300 border border-emerald-700/50 shrink-0">
                    <MapPin size={15} />
                  </div>
                  <span>الرياض، المملكة العربية السعودية</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800/80 text-amber-300 border border-emerald-700/50 shrink-0">
                    <Mail size={15} />
                  </div>
                  <span>support@nakhlah.sa</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800/80 text-emerald-400 border border-emerald-700/50 shrink-0">
                    <Globe2 size={15} />
                  </div>
                  <span>www.nakhlah.sa</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Saudi Flag Ribbon */}
          <div className="mt-12 pt-6 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right text-xs text-emerald-200/60 font-medium">
            <p>جميع الحقوق محفوظة © {new Date().getFullYear()} منصة نخلة للتوظيف والتأهيل المهني.</p>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-amber-300 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-700/60 shadow-inner">
                صُنعت بكل فخر وإتقان في المملكة العربية السعودية 🇸🇦
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  )
}
