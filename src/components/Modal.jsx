'use client'

import { useId } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

export function Modal({
  open,
  title,
  description,
  children,
  onClose,
}) {
  const titleId = useId()
  const descriptionId = useId()

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-7 shadow-2xl animate-slide-up border border-slate-100">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 id={titleId} className="font-serif text-xl sm:text-2xl font-bold text-slate-800">
              {title}
            </h3>
            {description ? (
              <p id={descriptionId} className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            aria-label="إغلاق النافذة"
            variant="ghost"
            className="h-9 w-9 rounded-full p-0 text-slate-400 hover:text-slate-700"
            onClick={onClose}
          >
            <X size={20} aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}
