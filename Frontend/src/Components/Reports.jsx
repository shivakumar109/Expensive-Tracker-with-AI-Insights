import React, { useContext, useEffect, useRef } from 'react';
import { ExpenseContext } from '../Context/ExpenseContext';
import { ExpensePieChart, IncomeExpenseBarChart } from './ExpenseChart';
import { FiDownload, FiFileText } from 'react-icons/fi';
import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';

const Reports = () => {
  const { expenses } = useContext(ExpenseContext);
  const reportRef = useRef();

  const downloadCSV = () => {
    if (!expenses.length) return toast.error("No data to export");
    const headers = ['Date,Description,Category,Type,Amount'];
    const rows = expenses.map(e => 
      `${new Date(e.date).toLocaleDateString()},"${e.description || ''}","${e.category || ''}",${e.type},${e.amount}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "financial_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV downloaded successfully");
  };

  const downloadPDF = () => {
    if (!expenses.length) return toast.error("No data to export");
    const element = reportRef.current;
    const opt = {
      margin: 0.5,
      filename: 'financial_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save().then(() => {
      toast.success("PDF downloaded successfully");
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
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
          <button 
            onClick={downloadPDF}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-500/30 transition-all font-medium"
          >
            <FiDownload className="mr-2" /> Download PDF
          </button>
        </div>
      </div>

      <div ref={reportRef} className="space-y-6">
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
                      ${exp.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;