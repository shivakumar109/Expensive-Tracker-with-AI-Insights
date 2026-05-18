import React, { useState, useContext } from 'react';
import { BudgetContext } from '../Context/BudgetContext';
import { FiX } from 'react-icons/fi';

const BudgetForm = ({ onClose, existingBudget }) => {
  const { addBudget, updateBudget } = useContext(BudgetContext);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(existingBudget?.budgetAmount || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (existingBudget) {
        await updateBudget(Number(amount));
      } else {
        const currentDate = new Date();
        await addBudget({
          month: currentDate.getMonth() + 1, // 1-indexed for backend
          year: currentDate.getFullYear(),
          budgetAmount: Number(amount),
        });
      }
      onClose();
    } catch (error) {
      // Error is handled in context with toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">
            {existingBudget ? 'Edit Budget' : 'Add Budget'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Budget Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex justify-center items-center"
            >
              {loading ? 'Saving...' : 'Save Budget'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BudgetForm;
