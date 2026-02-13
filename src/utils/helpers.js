/**
 * تنسيق الأرقام بالعربي
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('ar-SA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

/**
 * تنسيق العملة
 */
export const formatCurrency = (num) => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
  }).format(num);
};

/**
 * تنسيق التاريخ
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * الحصول على اسم الشهر بالعربية
 */
export const getMonthName = (month) => {
  const months = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];
  return months[month - 1] || '';
};

/**
 * الحصول على اللون حسب القيمة
 */
export const getColorByValue = (value, max) => {
  const percentage = (value / max) * 100;
  if (percentage >= 75) return 'text-green-600';
  if (percentage >= 50) return 'text-blue-600';
  if (percentage >= 25) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * حساب النسبة المئوية
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
};
