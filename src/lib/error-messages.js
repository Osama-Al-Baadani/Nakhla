export function getUserFacingErrorMessage(
  error,
  { fallback = 'حدث خطأ غير متوقع. حاول مرة أخرى.', isRlsBlocked = false } = {},
) {
  if (isRlsBlocked) {
    return 'لا تملك صلاحية الوصول إلى هذه البيانات في الوقت الحالي.'
  }

  const message =
    typeof error === 'string'
      ? error
      : error && typeof error === 'object' && 'message' in error
        ? String(error.message)
        : ''

  const normalized = message.toLowerCase()

  if (!message) {
    return fallback
  }

  if (
    normalized.includes('invalid login') ||
    normalized.includes('email not confirmed') ||
    normalized.includes('invalid credentials')
  ) {
    return 'تعذر إتمام تسجيل الدخول. تحقق من البريد الإلكتروني وكلمة المرور.'
  }

  if (normalized.includes('user already registered')) {
    return 'يوجد حساب مسجل بهذا البريد الإلكتروني بالفعل.'
  }

  if (normalized.includes('password should be at least')) {
    return 'كلمة المرور قصيرة جدًا. استخدم كلمة مرور أقوى ثم حاول مرة أخرى.'
  }

  if (
    normalized.includes('permission denied') ||
    normalized.includes('row-level security') ||
    normalized.includes('not allowed') ||
    normalized.includes('rls')
  ) {
    return 'لا تملك صلاحية تنفيذ هذا الإجراء في الوقت الحالي.'
  }

  if (
    normalized.includes('network') ||
    normalized.includes('fetch') ||
    normalized.includes('failed to fetch')
  ) {
    return 'تعذر الاتصال بالخدمة حاليًا. تحقق من الاتصال وحاول مرة أخرى.'
  }

  if (normalized.includes('expired') || normalized.includes('invalid token')) {
    return 'انتهت صلاحية الرابط الحالي أو أنه غير صالح. اطلب رابطًا جديدًا وحاول مرة أخرى.'
  }

  return fallback
}
