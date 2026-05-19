import React, { useContext, useEffect, useRef, useState } from 'react';
import { ExpenseContext } from '../Context/ExpenseContext';
import { ExpensePieChart, IncomeExpenseBarChart, YearlyExpenseChart } from './ExpenseChart';
import { FiFileText, FiEdit2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import TransactionForm from './TransactionForm';

const Reports = () => {
  const { expenses } = useContext(ExpenseContext);
  const reportRef = useRef();
  const [editingTransaction, setEditingTransaction] = useState(null);

  const getFormattedDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const downloadCSV = () => {
    if (!expenses.length) return toast.error("No data to export");
    const headers = ['Date,Description,Category,Type,Amount'];
    const rows = expenses.map(e => 
      `${new Date(e.date).toLocaleDateString()},"${(e.description || '').replace(/"/g, '""')}","${e.category || ''}",${e.type},${e.amount}`
    );
    const csvContent = headers.concat(rows).join('\n');
    
    // Create Blob instead of Data URI for reliability
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `financial_report_${getFormattedDate()}.csv`);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
    
    toast.success("CSV downloaded successfully");
  };


  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-slate-400 mt-1">Visualize your financial data and export reports.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={downloadCSV}
            className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors"
          >
            <FiFileText className="mr-2" /> Export CSV
          </button>
        </div>
      </div>

      <div ref={reportRef} className="space-y-6 print-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Expense by Category</h3>
            <div className="h-[300px] flex justify-center">
              {expenses.length > 0 ? (
                <ExpensePieChart expenses={expenses} />
              ) : (
                <div className="flex items-center text-slate-500">No expenses found</div>
              )}
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Income vs Expense</h3>
            <div className="h-[300px] flex justify-center w-full">
               {expenses.length > 0 ? (
                <IncomeExpenseBarChart expenses={expenses} />
              ) : (
                <div className="flex items-center text-slate-500">No transactions found</div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Yearly Trends (Income vs Expense)</h3>
          <div className="h-[300px] flex justify-center w-full">
             {expenses.length > 0 ? (
              <YearlyExpenseChart expenses={expenses} />
            ) : (
              <div className="flex items-center text-slate-500">No transactions found</div>
            )}
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4">Detailed Ledger</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-sm font-medium text-slate-400">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {expenses.map((exp) => (
                  <tr key={exp._id} className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">{new Date(exp.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-white font-medium">{exp.description || 'N/A'}</td>
                    <td className="py-3 px-4"><span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">{exp.category || 'N/A'}</span></td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${exp.type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-right font-bold ${exp.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ₹{exp.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button 
                        onClick={() => setEditingTransaction(exp)}
                        className="p-2 bg-slate-700 hover:bg-blue-600 text-slate-300 hover:text-white rounded transition-colors"
                        title="Edit Transaction"
                      >
                        <FiEdit2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingTransaction && (
        <TransactionForm 
          onClose={() => setEditingTransaction(null)} 
          transactionToEdit={editingTransaction} 
        />
      )}
    </div>
  );
};

export default Reports;