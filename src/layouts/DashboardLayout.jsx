'use client'

import { useMemo, useState } from 'react'
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  FileCheck2,
  GraduationCap,
  LayoutGrid,
  LogOut,
  Mail,
  Menu,
  Settings2,
  ShieldCheck,
  UserCircle2,
  Users,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar } from '../components/Avatar'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { cn } from '../lib/cn'
import { getRoleLabel } from '../lib/roles'
import { authService } from '../services/auth-service'

export function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, role } = useAuth()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const navigationItems = useMemo(() => {
    if (role === 'company') {
      return [
        { label: 'لوحة الشركة', icon: LayoutGrid, to: '/company/dashboard', match: '/company/dashboard' },
        { label: 'إدارة الوظائف', icon: Building2, to: '/company/jobs', match: '/company/jobs' },
        { label: 'استعراض المرشحين', icon: Users, to: '/company/candidates', match: '/company/candidates' },
        { label: 'متابعة الأداء', icon: ShieldCheck, to: '/company/performance', match: '/company/performance' },
        { label: 'الإشعارات', icon: Bell, to: '/company/notifications', match: '/company/notifications' },
        { label: 'الرسائل', icon: Mail, to: '/company/messages', match: '/company/messages' },
        { label: 'التعهيد الخارجي', icon: BriefcaseBusiness, to: '/company/outsourcing-requests', match: '/company/outsourcing-requests' },
        { label: 'الملف الشخصي', icon: UserCircle2, to: '/profile', match: '/profile' },
        { label: 'الإعدادات', icon: Settings2, to: '/settings', match: '/settings' },
      ]
    }

    return [
      { label: 'لوحة الباحث', icon: LayoutGrid, to: '/seeker/dashboard', match: '/seeker/dashboard' },
      { label: 'الوظائف المتاحة', icon: BriefcaseBusiness, to: '/jobs', match: '/jobs' },
      { label: 'طلبات التقديم', icon: FileCheck2, to: '/applications', match: '/applications' },
      { label: 'المقابلات', icon: Bell, to: '/interviews', match: '/interviews' },
      { label: 'الرسائل', icon: Mail, to: '/seeker/messages', match: '/seeker/messages' },
      { label: 'المسار التدريبي', icon: GraduationCap, to: '/seeker/training', match: '/seeker/training' },
      { label: 'الملف الشخصي', icon: UserCircle2, to: '/profile', match: '/profile' },
      { label: 'الإعدادات', icon: Settings2, to: '/settings', match: '/settings' },
    ]
  }, [role])

  // Floating App Dock Items for Mobile
  const mobileBottomItems = useMemo(() => {
    if (role === 'company') {
      return [
        { label: 'الرئيسية', icon: LayoutGrid, to: '/company/dashboard' },
        { label: 'الوظائف', icon: Building2, to: '/company/jobs' },
        { label: 'المرشحين', icon: Users, to: '/company/candidates' },
        { label: 'الرسائل', icon: Mail, to: '/company/messages' },
        { label: 'حسابي', icon: UserCircle2, to: '/profile' },
      ]
    }
    return [
      { label: 'الرئيسية', icon: LayoutGrid, to: '/seeker/dashboard' },
      { label: 'الوظائف', icon: BriefcaseBusiness, to: '/jobs' },
      { label: 'طلباتي', icon: FileCheck2, to: '/applications' },
      { label: 'التدريب', icon: GraduationCap, to: '/seeker/training' },
      { label: 'حسابي', icon: UserCircle2, to: '/profile' },
    ]
  }, [role])

  async function handleSignOut() {
    await authService.signOut()
    router.push('/login')
  }

  const dashboardLabel = role === 'company' ? 'مساحة الشركة' : 'مساحة الباحث'

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--text)] pb-24 lg:pb-6">
      {/* Container Layout */}
      <div className="mx-auto grid min-h-screen max-w-[1560px] grid-cols-1 gap-4 sm:gap-6 px-3 py-3 sm:px-5 sm:py-5 lg:grid-cols-[280px_1fr]">
        
        {/* Desktop Sidebar / Mobile Off-canvas Sheet */}
        <aside
          className={cn(
            'fixed inset-y-0 right-0 z-50 w-80 transform bg-white/95 p-5 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-auto lg:transform-none lg:rounded-[28px] lg:border lg:border-slate-200/80 lg:shadow-sm',
            mobileNavOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          )}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <Link href="/" className="flex items-center gap-3" onClick={() => setMobileNavOpen(false)}>
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-teal-600 text-white font-bold text-lg shadow-md shadow-teal-600/20">
                ن
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-teal-600 uppercase">منصة نخلة</p>
                <h1 className="font-serif text-xl font-bold text-slate-800">{dashboardLabel}</h1>
              </div>
            </Link>
            <Button
              variant="ghost"
              className="h-9 w-9 rounded-full p-0 text-slate-400 hover:text-slate-800"
              onClick={() => setMobileNavOpen(false)}
              aria-label="إغلاق القائمة"
            >
              <X size={20} aria-hidden="true" />
            </Button>
          </div>

          {/* Account Profile Tile */}
          <div className="mt-4 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-teal-50/40 p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <Avatar name={user?.email ?? 'المستخدم'} size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {user?.email ? user.email.split('@')[0] : 'المستخدم'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email ?? 'حساب معتمد'}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2.5 border-t border-slate-200/60">
              <Badge tone={role === 'company' ? 'brand' : 'warning'}>
                {getRoleLabel(role)}
              </Badge>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="mt-5 space-y-1.5 overflow-y-auto max-h-[calc(100vh-270px)] lg:max-h-none pr-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.to || pathname.startsWith(item.match)

              return (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    'group flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-semibold transition-all duration-200 active:scale-[0.98]',
                    isActive
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      aria-hidden="true"
                      className={cn(
                        'transition-transform duration-200 group-hover:scale-110',
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-600'
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-white shadow-sm" />
                  )}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Backdrop overlay for mobile drawer */}
        {mobileNavOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-md lg:hidden transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex flex-col gap-4 sm:gap-6 min-w-0">
          
          {/* App Top Header Bar */}
          <header className="sticky top-2 sm:top-3 z-30 flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/90 px-3.5 py-2.5 sm:px-5 sm:py-3 shadow-sm backdrop-blur-xl">
            
            {/* Right Side: Mobile menu drawer trigger & page indicator */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 active:scale-95 transition-all lg:hidden"
                onClick={() => setMobileNavOpen(true)}
                aria-label="فتح القائمة"
              >
                <Menu size={20} aria-hidden="true" />
              </button>
              <div>
                <p className="text-[10px] font-bold text-teal-600 tracking-wider uppercase hidden sm:block">منصة نخلة الرقمية</p>
                <h2 className="font-serif text-base sm:text-xl font-bold text-slate-800 tracking-tight">
                  {role === 'company' ? 'مساحة قطاع الأعمال' : 'لوحة التوظيف والتأهيل'}
                </h2>
              </div>
            </div>

            {/* Left Side: Actions & Profile */}
            <div className="flex items-center gap-2">
              <Link href={role === 'company' ? '/company/notifications' : '/interviews'} className="relative">
                <button
                  type="button"
                  className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-white active:scale-95 transition-all"
                  aria-label="الإشعارات"
                >
                  <Bell size={18} aria-hidden="true" />
                  <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
                </button>
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 pl-2.5 active:scale-95 transition-all focus:outline-none"
                >
                  <Avatar name={user?.email ?? 'مستخدم'} size="sm" />
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-slide-up z-50">
                    <div className="border-b border-slate-100 px-3 py-2 text-xs">
                      <p className="font-bold text-slate-800 truncate">{user?.email}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{getRoleLabel(role)}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors mt-1"
                    >
                      <UserCircle2 size={16} />
                      الملف الشخصي
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <Settings2 size={16} />
                      الإعدادات
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        void handleSignOut()
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut size={16} />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Children Page Content */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>

      {/* Floating Island App Dock for Mobile (Ultra-modern iOS style) */}
      <nav className="fixed bottom-3 left-3 right-3 z-40 lg:hidden">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200/90 bg-white/92 px-2 py-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
          <div className="flex items-center justify-around">
            {mobileBottomItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.to

              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={cn(
                    'flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-bold transition-all active:scale-95',
                    isActive
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                  )}
                >
                  <Icon size={19} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span className="leading-none mt-0.5">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}
