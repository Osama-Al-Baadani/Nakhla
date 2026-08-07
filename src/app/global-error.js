'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 flex items-center justify-center p-4">
        <div className="mx-auto max-w-md text-center space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-600 font-bold mx-auto text-xl">
            ⚠️
          </div>
          <h1 className="font-serif text-xl font-bold text-slate-800">خطأ في نظام المنصة</h1>
          <p className="text-xs text-slate-500">حدث خطأ عام أثناء تحميل التطبيق. يُرجى التحديث.</p>
          <button
            onClick={() => reset()}
            className="rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-teal-700 transition-colors"
          >
            تحديث الصفحة
          </button>
        </div>
      </body>
    </html>
  )
}
