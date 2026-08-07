export function RouteLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center p-8">
      <div
        className="flex items-center gap-3 rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm text-[var(--text-soft)] shadow-sm animate-pulse"
        role="status"
        aria-live="polite"
      >
        <span className="size-2 rounded-full bg-[var(--brand)] animate-ping" />
        جارٍ تحميل الصفحة...
      </div>
    </div>
  )
}
