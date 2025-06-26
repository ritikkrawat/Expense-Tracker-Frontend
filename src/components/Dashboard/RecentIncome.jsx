import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const RecentIncome = ({transactions, onSeeMore}) => {
  return (
    <div className='card transition-all duration-200 hover:shadow-xl hover:scale-[1.01] hover:border hover:border-blue-100 hover:bg-blue-50/20'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Income</h5>

        <button className='card-btn' onClick={onSeeMore}>
          See all <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-6'>
        {transactions?.slice(0,5)?.map((item) => (
            <TransactionInfoCard
                key={item._id}
                title={item.source}
                icon={item.icon}
                date={moment(item.date).format('DD MMM YYYY')}
                amount={item.amount}
                type='income'
                hideDeleteBtn
            />
        ))} 
      </div>
    </div>
  )
}

export default RecentIncome