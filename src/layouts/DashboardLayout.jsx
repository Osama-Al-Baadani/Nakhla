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

  // Mobile Bottom App Dock Items
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

  const roleTitle = role === 'company' ? 'قطاع الأعمال والشركات' : 'الباحث عن عمل والتأهيل'

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-24 lg:pb-8 font-sans antialiased">
      
      {/* Top Application Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-xs">
        <div className="mx-auto flex max-w-[1560px] items-center justify-between px-4 py-3 sm:px-6">
          
          {/* Right Section: Mobile Menu + Clean 'نخلة' Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all lg:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="فتح القائمة الرئيسية"
            >
              <Menu size={20} />
            </button>

            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="font-serif text-2xl font-black text-emerald-800 tracking-tight transition-colors group-hover:text-emerald-700">
                نخلة
              </span>
            </Link>
          </div>

          {/* Center Section: Quick Link Chips (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href={role === 'company' ? '/company/dashboard' : '/seeker/dashboard'}
              className="flex items-center gap-1.5 rounded-full bg-slate-100/80 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200/80 transition-colors"
            >
              <LayoutGrid size={14} className="text-emerald-700" />
              <span>الرئيسية</span>
            </Link>

            <Link
              href="/jobs"
              className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-900 border border-amber-200/80 hover:bg-amber-100/80 transition-colors"
            >
              <BriefcaseBusiness size={14} className="text-amber-600" />
              <span>سوق الوظائف</span>
            </Link>

            {role === 'company' ? (
              <Link
                href="/jobs/create"
                className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100/80 transition-colors"
              >
                <Building2 size={14} className="text-emerald-700" />
                <span>نشر وظيفة جديدة</span>
              </Link>
            ) : (
              <Link
                href="/seeker/training"
                className="flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-bold text-teal-900 border border-teal-200/80 hover:bg-teal-100/80 transition-colors"
              >
                <GraduationCap size={14} className="text-teal-700" />
                <span>المسار التدريبي</span>
              </Link>
            )}
          </div>

          {/* Left Section: Notifications + User Account Profile */}
          <div className="flex items-center gap-2.5">
            <Link
              href={role === 'company' ? '/company/notifications' : '/interviews'}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all shadow-2xs"
              aria-label="الإشعارات والتنبيهات"
            >
              <Bell size={18} />
              <span className="absolute top-2 left-2 h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
            </Link>

            {/* User Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white p-1.5 pl-3 hover:border-slate-300 active:scale-95 transition-all focus:outline-none shadow-2xs"
              >
                <Avatar name={user?.email ?? 'مستخدم'} size="sm" />
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                    {user?.email ? user.email.split('@')[0] : 'المستخدم'}
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold">{getRoleLabel(role)}</p>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute left-0 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl animate-slide-up z-50">
                  <div className="border-b border-slate-100 px-3 py-2.5 text-xs">
                    <p className="font-extrabold text-slate-900 truncate">{user?.email}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500">{getRoleLabel(role)}</span>
                      <Badge tone={role === 'company' ? 'brand' : 'gold'}>نشط</Badge>
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    >
                      <UserCircle2 size={16} className="text-emerald-700" />
                      <span>الملف الشخصي</span>
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    >
                      <Settings2 size={16} className="text-slate-500" />
                      <span>الإعدادات والحساب</span>
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        void handleSignOut()
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Main Workspace Layout (Sidebar + Main Content) */}
      <div className="mx-auto max-w-[1560px] px-3 py-4 sm:px-6 sm:py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[270px_1fr]">
          
          {/* Desktop Sidebar Navigation */}
          <aside
            className={cn(
              'fixed inset-y-0 right-0 z-50 w-80 transform bg-white p-5 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-auto lg:transform-none lg:rounded-2xl lg:border lg:border-slate-200/80 lg:shadow-xs lg:p-4',
              mobileNavOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
            )}
          >
            {/* Drawer Close Button for Mobile */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 lg:hidden">
              <span className="font-serif text-xl font-black text-emerald-800">نخلة</span>
              <Button
                variant="ghost"
                className="h-8 w-8 rounded-full p-0 text-slate-400 hover:text-slate-800"
                onClick={() => setMobileNavOpen(false)}
                aria-label="إغلاق القائمة"
              >
                <X size={20} />
              </Button>
            </div>

            {/* User Quick Info Box */}
            <div className="rounded-xl border border-amber-200/80 bg-gradient-to-br from-[#fffdfa] via-[#fffdf5] to-[#fef9eb] p-3.5 mb-4 shadow-2xs">
              <div className="flex items-center gap-3">
                <Avatar name={user?.email ?? 'مستخدم'} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-slate-900 truncate">
                    {user?.email ? user.email.split('@')[0] : 'المستخدم'}
                  </p>
                  <p className="text-[11px] font-semibold text-amber-900 mt-0.5">{getRoleLabel(role)}</p>
                </div>
              </div>
            </div>

            {/* Navigation Link Items */}
            <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-230px)] lg:max-h-none">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.to || (item.to !== '/seeker/dashboard' && item.to !== '/company/dashboard' && pathname.startsWith(item.match))

                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      'group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-150 active:scale-[0.98]',
                      isActive
                        ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-white shadow-sm shadow-emerald-800/20'
                        : 'text-slate-600 hover:bg-slate-100/90 hover:text-slate-900'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        size={17}
                        className={cn(
                          'transition-transform duration-150 group-hover:scale-110',
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-700'
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-xs" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* Backdrop overlay for mobile drawer */}
          {mobileNavOpen && (
            <div
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
              onClick={() => setMobileNavOpen(false)}
            />
          )}

          {/* Main Page Content Body */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>

      {/* Floating Island Bottom Dock for Mobile */}
      <nav className="fixed bottom-3 left-3 right-3 z-40 lg:hidden">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200/90 bg-white/95 px-2 py-1.5 shadow-[0_12px_36px_rgba(15,23,42,0.15)] backdrop-blur-xl">
          <div className="flex items-center justify-around">
            {mobileBottomItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.to

              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={cn(
                    'flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-black transition-all active:scale-95',
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/30'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                  )}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
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
