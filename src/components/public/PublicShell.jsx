export function PublicShell({ children, className }) {
  return <section className={className ?? 'space-y-16 md:space-y-24'}>{children}</section>
}
