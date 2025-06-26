import React, { useState } from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';
import Modal from '../Modal';
import EmojiPickerPopup from '../EmojiPickerPopup';

const IncomeList = ({ transactions, onDelete, onDownload, onEditIncome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [icon, setIcon] = useState('');

  const handleEditClick = (income) => {
    setSelectedIncome(income);
    setIcon(income.icon || '');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedIncome(null);
    setIcon('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...selectedIncome,
      source: e.target.source.value,
      amount: parseFloat(e.target.amount.value),
      date: e.target.date.value,
      icon: icon,
    };
    onEditIncome(updated);
    handleModalClose();
  };

  return (
    <>
      <div className="card transition-all duration-200 hover:shadow-xl hover:scale-[1.01] hover:border hover:border-blue-100 hover:bg-blue-50/20">
        <div className="flex items-center justify-between">
          <h5 className="text-lg">Income Sources</h5>
          <button className="card-btn" onClick={onDownload}>
            <LuDownload className="text-base" /> Download
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {transactions?.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format('Do MMM YYYY')}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
              onEdit={() => handleEditClick(income)}
            />
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Edit Income">
        {selectedIncome && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Source</label>
              <input
                type="text"
                name="source"
                defaultValue={selectedIncome.source}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                defaultValue={selectedIncome.amount}
                required
                min="1"
                step="0.01"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                defaultValue={moment(selectedIncome.date).format('YYYY-MM-DD')}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Icon</label>
              <EmojiPickerPopup icon={icon} onSelect={setIcon} />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleModalClose}
                className="px-4 py-2 text-sm text-gray-500 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default IncomeList;
