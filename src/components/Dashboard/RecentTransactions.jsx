import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card transition-all duration-200 hover:shadow-xl hover:scale-[1.01] hover:border hover:border-blue-100 hover:bg-blue-50/20">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Scrollable transaction list */}
      <div className="mt-6 max-h-[400px] overflow-y-auto pr-1 hide-scrollbar">
        {transactions?.length > 0 ? (
          transactions.map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === 'expense' ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format('Do MMM YYYY')}
              amount={item.amount} // raw number
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="text-sm text-gray-400 text-center mt-10">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
