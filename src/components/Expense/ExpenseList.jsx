import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card transition-all duration-200 hover:shadow-xl hover:scale-[1.01] hover:border hover:border-blue-100 hover:bg-blue-50/20'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>All Expenses</h5>

            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' /> Download
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((expense) => (
                <TransactionInfoCard
                    key={expense._id}
                    title={expense.category}
                    icon={expense.icon}
                    date={moment(expense.date).format('Do MMM YYYY')}
                    amount={expense.amount}
                    type='expense'
                    onDelete={() => onDelete(expense._id)}
                    onEdit={() => onEdit(expense)}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList