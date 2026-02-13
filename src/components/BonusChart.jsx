import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const BonusChart = ({ data }) => {
  const chartData = Object.entries(data).map(([branch, branchData]) => ({
    name: branch,
    مبيعات: branchData.totalSales,
    بونص: branchData.totalBonus,
    فواتير: branchData.invoiceCount,
  }));

  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        📊 مقارنة الأداء بين الفروع
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
          <Bar dataKey="مبيعات" fill="#0EA5E9" />
          <Bar dataKey="بونص" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BonusChart;
