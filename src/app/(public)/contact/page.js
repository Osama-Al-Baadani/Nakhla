'use client'

import { Building2, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { Input } from '../../../components/Input'
import { Textarea } from '../../../components/Textarea'
import { PublicSection } from '../../../components/public/PublicSection'
import { PublicShell } from '../../../components/public/PublicShell'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    window.setTimeout(() => setIsSubmitting(false), 500)
  }

  return (
    <PublicShell>
      <PublicSection
        eyebrow="تواصل معنا"
        title="دعنا نفهم احتياجك ونوجهك للمسار المناسب"
        description="واجهة التواصل جاهزة من جهة التجربة، بينما يبقى الإرسال الفعلي بانتظار ربط الخدمة الخلفية المناسبة."
      >
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {[
              { icon: Building2, title: 'نخلة', description: 'منصة توظيف وتأهيل وتعهيد موجهة للسوق السعودي.' },
              { icon: Mail, title: 'البريد', description: 'contact@nakhlah.sa - محتوى عرض فقط حتى اعتماد قناة التواصل النهائية.' },
              { icon: Phone, title: 'الهاتف', description: '+966 XX XXX XXXX - يحتاج إلى اعتماد العميل.' },
              { icon: MapPin, title: 'الموقع', description: 'الرياض، المملكة العربية السعودية - وصف عرضي حتى اعتماد العنوان الرسمي.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="bg-white">
                  <div className="space-y-3">
                    <div className="grid size-11 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-medium text-[var(--text)]">{item.title}</h3>
                    <p className="text-sm leading-8 text-[var(--text-soft)]">{item.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>

          <Card className="bg-white">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input label="الاسم" name="name" placeholder="الاسم الكامل" />
              <Input label="البريد الإلكتروني" name="email" type="email" placeholder="name@example.com" />
              <Input label="الموضوع" name="subject" placeholder="كيف يمكننا مساعدتك؟" />
              <Textarea label="الرسالة" name="message" rows={6} placeholder="اكتب تفاصيل الطلب أو الاستفسار" />
              <div className="rounded-[20px] border border-dashed border-[var(--line-strong)] bg-[var(--surface-muted)] p-4 text-sm leading-7 text-[var(--text-soft)]">
                إرسال النموذج بانتظار تفعيل خدمة التواصل أو البريد من فريق الباكند.
              </div>
              <Button type="submit" disabled isLoading={isSubmitting}>
                إرسال الرسالة
              </Button>
            </form>
          </Card>
        </div>
      </PublicSection>
    </PublicShell>
  )
}
