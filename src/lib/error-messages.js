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

  // Firebase Auth Error Codes & Standard Messages
  if (
    normalized.includes('email-already-in-use') ||
    normalized.includes('user already registered')
  ) {
    return 'يوجد حساب مسجل بهذا البريد الإلكتروني بالفعل. يمكنك تسجيل الدخول بدلاً من ذلك.'
  }

  if (
    normalized.includes('invalid-credential') ||
    normalized.includes('wrong-password') ||
    normalized.includes('user-not-found') ||
    normalized.includes('invalid login') ||
    normalized.includes('invalid credentials')
  ) {
    return 'بيانات الدخول غير صحيحة. تحقق من البريد الإلكتروني وكلمة المرور.'
  }

  if (
    normalized.includes('weak-password') ||
    normalized.includes('password should be at least')
  ) {
    return 'كلمة المرور ضعيفة جدًا. يرجى كتابة كلمة مرور أكثر قوة.'
  }

  if (normalized.includes('invalid-email')) {
    return 'صيغة البريد الإلكتروني غير صحيحة.'
  }

  if (normalized.includes('too-many-requests')) {
    return 'تم محاولة التسجيل/الدخول لمرات عديدة. يرجى الانتظار دقيقة والمحاولة لاحقاً.'
  }

  if (
    normalized.includes('permission-denied') ||
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
    return 'تعذر الاتصال بالخدمة حاليًا. تحقق من اتصال الإنترنت وحاول مرة أخرى.'
  }

  if (normalized.includes('expired') || normalized.includes('invalid token')) {
    return 'انتهت صلاحية الرابط الحالي أو أنه غير صالح. اطلب رابطًا جديدًا وحاول مرة أخرى.'
  }

  return fallback
}
