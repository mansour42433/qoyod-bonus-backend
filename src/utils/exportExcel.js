import * as XLSX from 'xlsx';

/**
 * تصدير بيانات البونص إلى Excel
 * @param {Object} data - بيانات البونص
 * @param {Object} period - معلومات الفترة (year, month, monthName)
 */
export const exportToExcel = (data, period) => {
  const workbook = XLSX.utils.book_new();

  // Sheet 1: الملخص
  const summaryData = [
    ['تقرير البونص الشهري'],
    ['الفترة', `${period.monthName} ${period.year}`],
    ['تاريخ التقرير', new Date().toLocaleDateString('ar-SA')],
    [],
    ['الفرع', 'إجمالي المبيعات', 'إجمالي البونص', 'عدد الفواتير', 'متوسط البونص'],
  ];

  Object.entries(data).forEach(([branch, branchData]) => {
    summaryData.push([
      branch,
      branchData.totalSales,
      branchData.totalBonus,
      branchData.invoiceCount,
      branchData.averageBonus,
    ]);
  });

  // حساب الإجمالي
  const totalSales = Object.values(data).reduce((sum, b) => sum + b.totalSales, 0);
  const totalBonus = Object.values(data).reduce((sum, b) => sum + b.totalBonus, 0);
  const totalInvoices = Object.values(data).reduce((sum, b) => sum + b.invoiceCount, 0);

  summaryData.push([]);
  summaryData.push(['الإجمالي', totalSales, totalBonus, totalInvoices, totalBonus / totalInvoices]);

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'الملخص');

  // Sheet 2: التفاصيل
  const detailsData = [
    [
      'الفرع',
      'رقم الفاتورة',
      'تاريخ الفاتورة',
      'تاريخ الدفع',
      'المنتج',
      'إجمالي السطر',
      'نسبة البونص %',
      'نسبة الدفع %',
      'البونص',
    ],
  ];

  Object.entries(data).forEach(([branch, branchData]) => {
    branchData.details.forEach((detail) => {
      detailsData.push([
        branch,
        detail.invoiceNumber,
        detail.invoiceDate,
        detail.paymentDate,
        detail.product,
        detail.lineTotal,
        detail.bonusPercent,
        detail.paymentRatio,
        detail.bonus,
      ]);
    });
  });

  const detailsSheet = XLSX.utils.aoa_to_sheet(detailsData);
  XLSX.utils.book_append_sheet(workbook, detailsSheet, 'التفاصيل');

  // تنزيل الملف
  const fileName = `bonus_report_${period.year}_${String(period.month).padStart(2, '0')}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

/**
 * تصدير بيانات فرع واحد إلى Excel
 */
export const exportBranchToExcel = (branchName, branchData, period) => {
  const workbook = XLSX.utils.book_new();

  const data = [
    [`تقرير بونص - ${branchName}`],
    ['الفترة', `${period.monthName} ${period.year}`],
    ['تاريخ التقرير', new Date().toLocaleDateString('ar-SA')],
    [],
    ['إجمالي المبيعات', branchData.totalSales],
    ['إجمالي البونص', branchData.totalBonus],
    ['عدد الفواتير', branchData.invoiceCount],
    ['متوسط البونص', branchData.averageBonus],
    [],
    [
      'رقم الفاتورة',
      'تاريخ الفاتورة',
      'تاريخ الدفع',
      'المنتج',
      'إجمالي السطر',
      'نسبة البونص %',
      'نسبة الدفع %',
      'البونص',
    ],
  ];

  branchData.details.forEach((detail) => {
    data.push([
      detail.invoiceNumber,
      detail.invoiceDate,
      detail.paymentDate,
      detail.product,
      detail.lineTotal,
      detail.bonusPercent,
      detail.paymentRatio,
      detail.bonus,
    ]);
  });

  const sheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, sheet, branchName);

  const fileName = `bonus_${branchName}_${period.year}_${String(period.month).padStart(2, '0')}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};
