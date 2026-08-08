import '../index.css'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata = {
  title: 'نخلة - المنصة السعودية المهنية للتوظيف والتأهيل والتدريب والتعهيد',
  description:
    'منصة سعودية حديثة للتوظيف والتأهيل والعمل عن بعد والتعهيد، تربط الباحثين عن عمل بالشركات ضمن تجربة عربية مهنية فائقة الجودة.',
  keywords: ['توظيف', 'سعودية', 'تأهيل', 'تدريب', 'تعهيد', 'عمل عن بعد', 'وظائف'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700;800&family=Readex+Pro:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--app-bg)] text-[var(--text)] antialiased selection:bg-[var(--brand-soft)] selection:text-[var(--brand-strong)] font-sans">
        {children}
      </body>
    </html>
  )
}
