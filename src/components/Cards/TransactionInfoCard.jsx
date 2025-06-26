import React from 'react'
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuPencil,
} from 'react-icons/lu'
import { formatRupee } from '../../utils/formatCurrency'

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  onEdit,
}) => {
  const getAmountStyles = () =>
    type === 'income' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'

  const formattedAmount = `${type === 'income' ? '+' : '-'} ${formatRupee(amount)}`

  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:shadow-md hover:scale-[1.01] cursor-pointer'>
      <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
        {icon ? (
          typeof icon === 'string' && icon.startsWith('http') ? (
            <img src={icon} alt={title} className='w-6 h-6' />
          ) : (
            <LuUtensils />
          )
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className='flex-1 flex items-center justify-between'>
        <div>
          <p className='text-sm text-gray-700 font-medium'>{title}</p>
          <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>

        <div className='flex items-center gap-2'>
          {!hideDeleteBtn && (
            <>
              <button
                className='text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                onClick={onEdit}
              >
                <LuPencil size={18} />
              </button>
              <button
                className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                onClick={onDelete}
              >
                <LuTrash2 size={18} />
              </button>
            </>
          )}

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
            <h6 className='text-xs font-medium'>{formattedAmount}</h6>
            {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard
