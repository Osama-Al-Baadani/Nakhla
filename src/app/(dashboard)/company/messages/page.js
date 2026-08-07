'use client'

import { useMemo, useState } from 'react'
import {
  Archive,
  Building2,
  File,
  FileImage,
  FileText,
  Mail,
  MessageCircleMore,
  Paperclip,
  Search,
  SendHorizonal,
  ShieldAlert,
  Upload,
  UserRound,
} from 'lucide-react'
import { Badge } from '../../../../components/Badge'
import { Button } from '../../../../components/Button'
import { Card } from '../../../../components/Card'
import { EmptyState } from '../../../../components/EmptyState'
import { PageHeader } from '../../../../components/PageHeader'
import { useAuth } from '../../../../hooks/useAuth'
import { cn } from '../../../../lib/cn'
import { demoConversationsByRole } from '../../../../lib/messages-demo'

const composerTools = [
  {
    key: 'image',
    label: 'إرسال صورة',
    description: 'رفع صورة من الجهاز وإرسالها ضمن المحادثة.',
    icon: FileImage,
  },
  {
    key: 'document',
    label: 'إرسال مستند',
    description: 'إرفاق سيرة ذاتية أو ملف PDF أو مستند رسمي.',
    icon: FileText,
  },
  {
    key: 'file',
    label: 'إرسال ملف',
    description: 'إرفاق أي ملف إضافي مرتبط بالوظيفة أو التواصل.',
    icon: Paperclip,
  },
]

export default function MessagesPage() {
  const { role } = useAuth()
  const resolvedRole = role === 'company' ? 'company' : 'seeker'
  const [query, setQuery] = useState('')
  const conversations = demoConversationsByRole[resolvedRole] || []

  const filteredConversations = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return conversations

    return conversations.filter((conversation) =>
      `${conversation.participantName} ${conversation.participantTitle} ${conversation.relatedContext}`
        .toLowerCase()
        .includes(normalized),
    )
  }, [conversations, query])

  const [activeConversationId, setActiveConversationId] = useState(
    filteredConversations[0]?.id ?? conversations[0]?.id ?? '',
  )

  const activeConversation =
    filteredConversations.find((conversation) => conversation.id === activeConversationId) ??
    conversations.find((conversation) => conversation.id === activeConversationId) ??
    filteredConversations[0] ??
    conversations[0] ??
    null

  const pageTitle = resolvedRole === 'company' ? 'محادثات الشركة مع المرشحين' : 'محادثاتك مع الشركات'
  const pageDescription =
    resolvedRole === 'company'
      ? 'واجهة دردشة جاهزة للشركة للتواصل مع المرشحين، مع دعم واجهة الرسائل والملفات والصور والمستندات عند اكتمال الربط الخلفي.'
      : 'واجهة دردشة جاهزة للباحث عن عمل لمتابعة التواصل مع الشركات، مع دعم الرسائل والمرفقات والصور والمستندات بعد اكتمال الربط الخلفي.'

  const composerPlaceholder =
    resolvedRole === 'company'
      ? 'اكتب رسالتك هنا. عند اكتمال الربط سيتم إرسالها للموظف مع إمكانية إرفاق الصور والملفات والمستندات، وسيصل تنبيه بريدي للمستلم.'
      : 'اكتب رسالتك هنا. عند اكتمال الربط ستتمكن من إرسال الرسائل والملفات والصور والمستندات مباشرة إلى الشركة.'

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.95),_rgba(239,246,252,0.92))]">
        <PageHeader
          eyebrow="الدردشة"
          title={pageTitle}
          description={pageDescription}
          actions={
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">واجهة دردشة</Badge>
              <Badge tone="warning">بانتظار الربط الخلفي</Badge>
            </div>
          }
        />
      </Card>

      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <Card title="المحادثات" description="قائمة المحادثات المرتبطة بالوظائف أو الطلبات الحالية.">
          <label className="relative block">
            <span className="sr-only">بحث في المحادثات</span>
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={resolvedRole === 'company' ? 'ابحث باسم المرشح أو الوظيفة' : 'ابحث باسم الشركة أو الوظيفة'}
              className="h-11 w-full rounded-[14px] border border-[var(--line)] bg-white ps-4 pe-10 text-sm text-[var(--text)] outline-none transition focus:border-[var(--brand)]"
            />
          </label>

          <div className="mt-5 space-y-3">
            {filteredConversations.length === 0 ? (
              <EmptyState
                title="لا توجد نتائج مطابقة"
                description="جرّب كلمة بحث أخرى، أو اترك الحقل فارغًا لعرض جميع المحادثات الجاهزة في المعاينة."
              />
            ) : (
              filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setActiveConversationId(conversation.id)}
                  className={cn(
                    'w-full rounded-[22px] border p-4 text-right transition',
                    activeConversation?.id === conversation.id
                      ? 'border-[var(--brand)] bg-[var(--brand-soft)]/40'
                      : 'border-[var(--line)] bg-white hover:bg-[var(--surface-muted)]',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        {conversation.participantRole === 'company' ? (
                          <Building2 size={16} aria-hidden="true" className="text-[var(--brand)]" />
                        ) : (
                          <UserRound size={16} aria-hidden="true" className="text-[var(--brand)]" />
                        )}
                        <p className="text-sm font-medium text-[var(--text)]">{conversation.participantName}</p>
                      </div>
                      <p className="mt-2 text-sm text-[var(--text-soft)]">{conversation.participantTitle}</p>
                    </div>
                    {conversation.unreadCount > 0 ? <Badge tone="brand">{conversation.unreadCount} جديد</Badge> : null}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge tone={conversation.status === 'active' ? 'brand' : conversation.status === 'pending' ? 'warning' : 'neutral'}>
                      {conversation.status === 'active' ? 'نشطة' : conversation.status === 'pending' ? 'قيد الانتظار' : 'مؤرشفة'}
                    </Badge>
                    <span className="text-xs text-[var(--text-faint)]">{conversation.relatedContext}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>

        {activeConversation ? (
          <Card
            title={activeConversation.participantName}
            description={`${activeConversation.participantTitle} - ${activeConversation.relatedContext}`}
            actions={
              <div className="flex flex-wrap gap-2">
                <Badge tone={activeConversation.status === 'active' ? 'brand' : activeConversation.status === 'pending' ? 'warning' : 'neutral'}>
                  {activeConversation.status === 'active' ? 'محادثة نشطة' : activeConversation.status === 'pending' ? 'بانتظار الرد' : 'محادثة مؤرشفة'}
                </Badge>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="rounded-[24px] border border-[var(--line)] bg-[linear-gradient(180deg,_rgba(248,251,253,0.96),_rgba(255,255,255,0.98))] p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <MessageCircleMore size={18} aria-hidden="true" className="text-[var(--brand)]" />
                    <span className="text-sm font-medium text-[var(--text)]">سجل المحادثة</span>
                  </div>
                  <span className="text-xs text-[var(--text-faint)]">
                    آخر تحديث في {new Date(activeConversation.lastMessageAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>

                <div className="max-h-[480px] space-y-3 overflow-y-auto pe-1">
                  {activeConversation.messages.map((message) => {
                    const isOwnMessage = message.senderRole === resolvedRole

                    return (
                      <div key={message.id} className={cn('flex', isOwnMessage ? 'justify-start' : 'justify-end')}>
                        <div
                          className={cn(
                            'max-w-[90%] rounded-[22px] px-4 py-3 text-sm leading-7 shadow-sm',
                            isOwnMessage
                              ? 'bg-[var(--brand)] text-white'
                              : 'border border-[var(--line)] bg-white text-[var(--text)]',
                          )}
                        >
                          <p className={cn('text-xs font-medium', isOwnMessage ? 'text-white/80' : 'text-[var(--text-faint)]')}>
                            {message.senderName}
                          </p>
                          <p className="mt-2">{message.text}</p>

                          {message.attachments?.length ? (
                            <div className="mt-3 space-y-2">
                              {message.attachments.map((attachment) => (
                                <AttachmentChip key={attachment.id} attachment={attachment} ownMessage={isOwnMessage} />
                              ))}
                            </div>
                          ) : null}

                          <p className={cn('mt-3 text-[11px]', isOwnMessage ? 'text-white/75' : 'text-[var(--text-faint)]')}>
                            {new Date(message.sentAt).toLocaleString('ar-SA')}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
                <div className="space-y-4 rounded-[24px] border border-[var(--line)] bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <label className="block text-sm font-medium text-[var(--text)]">إرسال رسالة</label>
                    <Badge tone="warning">الإرسال غير مفعل حاليًا</Badge>
                  </div>

                  <textarea
                    disabled
                    rows={5}
                    placeholder={composerPlaceholder}
                    className="w-full rounded-[18px] border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-soft)] outline-none"
                  />

                  <div className="grid gap-3 sm:grid-cols-3">
                    {composerTools.map((tool) => {
                      const Icon = tool.icon

                      return (
                        <button
                          key={tool.key}
                          type="button"
                          disabled
                          aria-disabled="true"
                          className="rounded-[20px] border border-dashed border-[var(--line)] bg-[var(--surface-muted)] p-4 text-right opacity-80"
                        >
                          <div className="mb-3 flex items-center gap-2">
                            <div className="grid size-9 place-items-center rounded-2xl bg-white text-[var(--brand)] shadow-sm">
                              <Icon size={18} aria-hidden="true" />
                            </div>
                            <span className="text-sm font-medium text-[var(--text)]">{tool.label}</span>
                          </div>
                          <p className="text-xs leading-6 text-[var(--text-soft)]">{tool.description}</p>
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button disabled leadingIcon={<SendHorizonal size={16} aria-hidden="true" />}>
                      إرسال الرسالة
                    </Button>
                    <Button variant="secondary" disabled leadingIcon={<Upload size={16} aria-hidden="true" />}>
                      إضافة مرفق
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Card title="حالة المحادثة" description="معلومات مختصرة تساعد على فهم وضع هذه المحادثة.">
                    <div className="space-y-3">
                      <InfoRow
                        icon={<ShieldAlert size={16} aria-hidden="true" className="text-[var(--warn)]" />}
                        label="الربط الخلفي"
                        value="بانتظار الجداول والصلاحيات وخدمة رفع المرفقات."
                      />
                      <InfoRow
                        icon={<Archive size={16} aria-hidden="true" className="text-[var(--text-faint)]" />}
                        label="السياق"
                        value={activeConversation.relatedContext}
                      />
                      <InfoRow
                        icon={<Mail size={16} aria-hidden="true" className="text-[var(--brand)]" />}
                        label="الإشعار البريدي"
                        value={
                          resolvedRole === 'company'
                            ? 'سيصل إلى بريد الموظف عند تفعيل الرسائل والإشعارات البريدية.'
                            : 'سيصلك على بريدك الإلكتروني عند تفعيل الرسائل والإشعارات البريدية.'
                        }
                      />
                      <InfoRow
                        icon={<Paperclip size={16} aria-hidden="true" className="text-[var(--brand)]" />}
                        label="المرفقات"
                        value="الواجهة جاهزة للصور والملفات والمستندات، بانتظار خدمة الرفع والحفظ."
                      />
                    </div>
                  </Card>

                  <Card title="ما الذي سيتفعل لاحقًا؟" description="تم تجهيز تجربة الدردشة من جهة الواجهة.">
                    <div className="space-y-2 text-sm leading-7 text-[var(--text-soft)]">
                      <p>• إنشاء المحادثة عند التقديم أو الترشيح</p>
                      <p>• إرسال الرسائل الفعلية بين الطرفين</p>
                      <p>• رفع الصور داخل المحادثة</p>
                      <p>• رفع الملفات والمستندات</p>
                      <p>• إشعار بريدي عند وصول رسالة جديدة</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <EmptyState
            title="لا توجد محادثة محددة"
            description="اختر محادثة من القائمة لعرض الرسائل والمرفقات أو راجع التكامل الخلفي عند تفعيل خدمة الدردشة."
          />
        )}
      </div>
    </section>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="rounded-[18px] bg-[var(--surface-muted)] p-3">
      <div className="flex items-center gap-2 text-[var(--text-faint)]">
        {icon}
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <p className="mt-2 text-sm text-[var(--text)]">{value}</p>
    </div>
  )
}

function AttachmentChip({ attachment, ownMessage }) {
  const Icon = attachment.kind === 'image' ? FileImage : attachment.kind === 'document' ? FileText : File

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-[18px] border px-3 py-2',
        ownMessage ? 'border-white/20 bg-white/10' : 'border-[var(--line)] bg-[var(--surface-muted)]',
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'grid size-9 place-items-center rounded-2xl',
            ownMessage ? 'bg-white/15 text-white' : 'bg-white text-[var(--brand)]',
          )}
        >
          <Icon size={16} aria-hidden="true" />
        </div>
        <div>
          <p className={cn('text-sm font-medium', ownMessage ? 'text-white' : 'text-[var(--text)]')}>{attachment.name}</p>
          <p className={cn('text-[11px]', ownMessage ? 'text-white/70' : 'text-[var(--text-faint)]')}>{attachment.sizeLabel}</p>
        </div>
      </div>
      <Badge tone={ownMessage ? 'neutral' : 'brand'}>
        {attachment.kind === 'image' ? 'صورة' : attachment.kind === 'document' ? 'مستند' : 'ملف'}
      </Badge>
    </div>
  )
}
