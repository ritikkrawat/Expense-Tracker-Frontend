import React, { useState } from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';
import Modal from '../Modal';
import EmojiPickerPopup from '../EmojiPickerPopup'; // Make sure path is correct

const ExpenseList = ({ transactions, onDelete, onDownload, onEditExpense }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleEditClick = (expense) => {
    setSelectedExpense({ ...expense }); // clone to avoid direct mutation
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...selectedExpense,
      category: e.target.category.value,
      amount: parseFloat(e.target.amount.value),
      date: e.target.date.value,
    };
    onEditExpense(updated);
    handleModalClose();
  };

  return (
    <>
      <div className="card transition-all duration-200 hover:shadow-xl hover:scale-[1.01] hover:border hover:border-blue-100 hover:bg-blue-50/20">
        <div className="flex items-center justify-between">
          <h5 className="text-lg">All Expenses</h5>
          <button className="card-btn" onClick={onDownload}>
            <LuDownload className="text-base" /> Download
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {transactions?.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format('Do MMM YYYY')}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
              onEdit={() => handleEditClick(expense)}
            />
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Edit Expense">
        {selectedExpense && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                defaultValue={selectedExpense.category}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                defaultValue={selectedExpense.amount}
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
                defaultValue={moment(selectedExpense.date).format('YYYY-MM-DD')}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* ✅ Emoji Picker */}
            <div>
              <label className="text-sm font-medium text-gray-700">Icon</label>
              <EmojiPickerPopup
                icon={selectedExpense.icon}
                onSelect={(emoji) => setSelectedExpense((prev) => ({ ...prev, icon: emoji }))}
              />
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

export default ExpenseList;
