'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../components/Button'

export default function GlobalErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled app error:', error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4 py-12">
      <div className="mx-auto max-w-md space-y-5 rounded-3xl border border-rose-200/80 bg-gradient-to-b from-white via-rose-50/30 to-amber-50/20 p-8 shadow-xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-100 text-rose-600 font-bold text-2xl">
          ⚠️
        </div>
        <h2 className="font-serif text-2xl font-bold text-slate-800">حدث خطأ غير متوقع</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          نعتذر عن هذا الخلل المؤقت. يمكنك المحاولة مرة أخرى أو العودة للصفحة الرئيسية للمنصة.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button onClick={() => reset()}>
            إعادة المحاولة
          </Button>
          <Link href="/">
            <Button variant="secondary">الرئيسية</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
