import { X, Download } from 'lucide-react';
import { formatCurrency, formatDate, formatNumber } from '../utils/helpers';
import { exportBranchToExcel } from '../utils/exportExcel';

const BranchDetailsModal = ({ branchName, data, period, onClose }) => {
  const handleExport = () => {
    exportBranchToExcel(branchName, data, period);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {branchName}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {period.monthName} {period.year}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleExport} className="btn btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              تصدير Excel
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 dark:bg-gray-900/50">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المبيعات</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              {formatCurrency(data.totalSales)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي البونص</p>
            <p className="text-xl font-bold text-primary-600 dark:text-primary-400 mt-1">
              {formatCurrency(data.totalBonus)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">عدد الفواتير</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              {data.invoiceCount}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">متوسط البونص</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              {formatCurrency(data.averageBonus)}
            </p>
          </div>
        </div>

        {/* Details Table */}
        <div className="overflow-auto max-h-[50vh] p-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-right">رقم الفاتورة</th>
                <th className="px-4 py-3 text-right">تاريخ الفاتورة</th>
                <th className="px-4 py-3 text-right">تاريخ الدفع</th>
                <th className="px-4 py-3 text-right">المنتج</th>
                <th className="px-4 py-3 text-right">إجمالي السطر</th>
                <th className="px-4 py-3 text-right">نسبة البونص</th>
                <th className="px-4 py-3 text-right">نسبة الدفع</th>
                <th className="px-4 py-3 text-right">البونص</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.details.map((detail, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-medium">{detail.invoiceNumber}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {formatDate(detail.invoiceDate)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {formatDate(detail.paymentDate)}
                  </td>
                  <td className="px-4 py-3">{detail.product}</td>
                  <td className="px-4 py-3">{formatNumber(detail.lineTotal)}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                      {detail.bonusPercent}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {detail.paymentRatio}%
                  </td>
                  <td className="px-4 py-3 font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(detail.bonus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BranchDetailsModal;
