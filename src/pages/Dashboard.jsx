import { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Building2,
  FileText,
  Download,
  Calendar,
  Search,
} from 'lucide-react';
import { bonusAPI } from '../services/api';
import StatCard from '../components/StatCard';
import BranchCard from '../components/BranchCard';
import BonusChart from '../components/BonusChart';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import BranchDetailsModal from '../components/BranchDetailsModal';
import { exportToExcel } from '../utils/exportExcel';
import { formatCurrency, getMonthName } from '../utils/helpers';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bonusData, setBonusData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [period, setPeriod] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  
  // Form state
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const fetchBonusData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bonusAPI.calculateBonus(year, month);
      
      if (response.success) {
        setBonusData(response.data);
        setSummary(response.summary);
        setPeriod(response.period);
      } else {
        setError(response.error || 'فشل في جلب البيانات');
      }
    } catch (err) {
      console.error('Error fetching bonus data:', err);
      setError(
        err.response?.data?.error ||
        'فشل الاتصال بالخادم. تأكد من تشغيل Backend على المنفذ 3000'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExportAll = () => {
    if (bonusData && period) {
      exportToExcel(bonusData, period);
    }
  };

  const handleBranchClick = (branchName, branchData) => {
    setSelectedBranch({ name: branchName, data: branchData });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📊 لوحة تحكم البونص
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          عرض وإدارة بونص المبيعات الشهري من Qoyod
        </p>
      </div>

      {/* Search Form */}
      <div className="card p-6 mb-8">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline ml-1" />
              السنة
            </label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="input"
            >
              {[...Array(5)].map((_, i) => {
                const y = currentYear - 2 + i;
                return (
                  <option key={y} value={y}>
                    {y}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline ml-1" />
              الشهر
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="input"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {getMonthName(i + 1)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchBonusData}
            disabled={loading}
            className="btn btn-primary flex items-center gap-2 min-w-[150px]"
          >
            <Search className="w-4 h-4" />
            {loading ? 'جاري البحث...' : 'عرض التقرير'}
          </button>

          {bonusData && (
            <button
              onClick={handleExportAll}
              className="btn btn-secondary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              تصدير Excel
            </button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      {/* Loading State */}
      {loading && <LoadingSpinner text="جاري تحميل بيانات البونص..." />}

      {/* Summary Stats */}
      {summary && !loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="إجمالي المبيعات"
              value={formatCurrency(summary.totalSales)}
              icon={DollarSign}
              color="blue"
            />
            <StatCard
              title="إجمالي البونص"
              value={formatCurrency(summary.totalBonus)}
              icon={TrendingUp}
              color="green"
            />
            <StatCard
              title="عدد الفروع"
              value={summary.totalBranches}
              icon={Building2}
              color="purple"
            />
            <StatCard
              title="عدد الفواتير"
              value={summary.totalInvoices}
              icon={FileText}
              color="orange"
            />
          </div>

          {/* Chart */}
          {Object.keys(bonusData).length > 0 && (
            <div className="mb-8">
              <BonusChart data={bonusData} />
            </div>
          )}

          {/* Branches Grid */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🏢 تفاصيل الفروع
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(bonusData).map(([branchName, branchData]) => (
                <BranchCard
                  key={branchName}
                  branchName={branchName}
                  data={branchData}
                  onClick={() => handleBranchClick(branchName, branchData)}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!bonusData && !loading && !error && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            لا توجد بيانات
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            اختر السنة والشهر ثم اضغط "عرض التقرير"
          </p>
        </div>
      )}

      {/* Branch Details Modal */}
      {selectedBranch && (
        <BranchDetailsModal
          branchName={selectedBranch.name}
          data={selectedBranch.data}
          period={period}
          onClose={() => setSelectedBranch(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
