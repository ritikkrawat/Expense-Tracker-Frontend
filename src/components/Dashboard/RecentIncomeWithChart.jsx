import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { formatRupee } from '../../utils/formatCurrency';  // Make sure you import the centralized formatter

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4F39F6'];  // fixed missing # in last color

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  }, [data]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label='Total Income'
        totalAmount={formatRupee(totalIncome)}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
