import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='group relative flex gap-6 bg-white p-6 rounded-2xl border border-gray-200/60 hover:bg-gray-100/60 transition-all duration-200 ease-in-out'>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
        <span className='text-[22px]'>{value}</span>
      </div>
    </div>
  )
}

export default InfoCard
