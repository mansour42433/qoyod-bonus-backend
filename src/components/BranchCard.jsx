import { Building2, FileText, DollarSign, TrendingUp } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/helpers';

const BranchCard = ({ branchName, data, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card p-6 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
            <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {branchName}
          </h3>
        </div>
        <div className="text-left">
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {formatCurrency(data.totalBonus)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            إجمالي البونص
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {formatNumber(data.totalSales)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">المبيعات</p>
        </div>

        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {data.invoiceCount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">فاتورة</p>
        </div>

        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {formatNumber(data.averageBonus)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">متوسط</p>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
