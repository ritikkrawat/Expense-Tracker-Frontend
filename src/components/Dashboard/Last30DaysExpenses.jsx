import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomExpenseBarChart from '../Charts/CustomExpenseBarChart';

const Last30DaysExpenses = ({data}) => {

    const [chartData, setChartData] = useState([]);

    useEffect (() => {
      const result = prepareExpenseBarChartData(data);
      setChartData(result);

      return () => {};
    }, [data]);

  return (
    <div className='card transition-all duration-200 hover:shadow-xl hover:scale-[1.01] hover:border hover:border-blue-100 hover:bg-blue-50/20 col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Expenses</h5>
        </div>

        <CustomExpenseBarChart data = {chartData}/>
    </div>
  )
}

export default Last30DaysExpenses