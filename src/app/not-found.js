'use client'

import Link from 'next/link'
import { Button } from '../components/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4 py-12">
      <div className="mx-auto max-w-md space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-teal-50 text-teal-600 font-serif font-black text-3xl">
          404
        </div>
        <h2 className="font-serif text-2xl font-bold text-slate-800">الصفحة غير موجودة</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          عذراً، الصفحة التي تحاول الوصول إليها غير متاحة أو تم تغيير رابطها.
        </p>

        <div className="flex justify-center pt-2">
          <Link href="/">
            <Button>العودة للصفحة الرئيسية</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
