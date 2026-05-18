import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../Context/ExpenseContext';
import { FiX, FiUploadCloud } from 'react-icons/fi';
import axiosInstance from '../Services/axiosInstance';
import toast from 'react-hot-toast';

const TransactionForm = ({ onClose }) => {
  const { addExpense } = useContext(ExpenseContext);
  const [loading, setLoading] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScanLoading(true);
    const form = new FormData();
    form.append('receipt', file);

    try {
      const res = await axiosInstance.post('/receipt-api/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const data = res.data.payload.extracted;
      
      setFormData(prev => ({
        ...prev,
        amount: data.amount || prev.amount,
        description: data.merchant || prev.description,
      }));
      toast.success('Receipt scanned successfully');
    } catch (error) {
      toast.error('Failed to scan receipt');
    } finally {
      setScanLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        amount: Number(formData.amount)
      };
      if (submissionData.type === 'income') {
        delete submissionData.category;
      }
      await addExpense(submissionData);
      onClose();
    } catch (error) {
      // Error is handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Add Transaction</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Receipt Scanner */}
          <div className="mb-6">
            <label className="flex items-center justify-center w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-700 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer transition-colors text-slate-300 hover:text-blue-400 group">
              {scanLoading ? (
                <span className="animate-pulse flex items-center"><FiUploadCloud className="mr-2" /> Scanning Receipt...</span>
              ) : (
                <span className="flex items-center"><FiUploadCloud className="mr-2 group-hover:scale-110 transition-transform" /> Scan Receipt (OCR)</span>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={scanLoading} />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense' })}
                className={`py-2 rounded-lg font-medium transition-colors ${formData.type === 'expense' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' : 'bg-slate-900 border border-slate-700 text-slate-400'}`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
                className={`py-2 rounded-lg font-medium transition-colors ${formData.type === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-slate-900 border border-slate-700 text-slate-400'}`}
              >
                Income
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {formData.type === 'expense' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Walmart Groceries"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Date</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex justify-center items-center"
            >
              {loading ? 'Saving...' : 'Save Transaction'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
