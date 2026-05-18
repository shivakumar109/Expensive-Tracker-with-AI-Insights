import React, { useContext, useEffect, useState } from 'react';
import { ExpenseContext } from '../Context/ExpenseContext';
import { AuthContext } from '../Context/AuthContext';
import { BudgetContext } from '../Context/BudgetContext';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiAlertCircle,
  FiPlus,
  FiTarget
} from 'react-icons/fi';

import TransactionForm from './TransactionForm';
import BudgetForm from './BudgetForm';

const Dashboard = () => {

  const { user } = useContext(AuthContext);

  const {
  expenses,
  summary,
  loading
} = useContext(ExpenseContext);

const {
  budget
} = useContext(BudgetContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  // Format INR
  const formatCurrency = (amount) => {

    return amount.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR'
    });

  };

  // Budget calculations
  const yearlyBudget = budget?.budgetAmount || 0;

  const spentAmount = budget?.expense || 0;

  const remainingBudget = budget?.remainingBudget || 0;

  // Loading
  if (loading)
    return (
      <div className="flex items-center justify-center h-full">

        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>

      </div>
    );

  return (

    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Top Section */}
      <div className="flex justify-between items-center">

        {/* Left */}
        <div>

          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-2 text-lg">
            Hi{' '}

            <span className="text-blue-400 font-semibold">
              {user?.firstName}
            </span>

            , Welcome Back 👋
          </p>

        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          {/* Profile */}
          <img
            src={
              user?.profileImageUrl ||
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            }
            alt="profile"
            className="w-16 h-16 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />

        </div>

      </div>

      {/* Budget Section */}
      <div>

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-white">
            This Year Budget
          </h2>
          {budget ? (
            <button 
              onClick={() => setIsBudgetModalOpen(true)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium border border-slate-600"
            >
              Edit Budget
            </button>
          ) : (
            <button 
              onClick={() => setIsBudgetModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg shadow-emerald-500/30 transition-all text-sm font-medium flex items-center"
            >
              <FiPlus className="mr-1" /> Add Budget
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Total Budget */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">

            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FiTarget size={80} />
            </div>

            <p className="text-sm font-medium text-slate-400 mb-1">
              Total Budget
            </p>

            <h3 className="text-3xl font-bold text-cyan-400">
              {formatCurrency(yearlyBudget)}
            </h3>

          </div>

          {/* Spent */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">

            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FiTrendingDown size={80} />
            </div>

            <p className="text-sm font-medium text-slate-400 mb-1">
              Spent
            </p>

            <h3 className="text-3xl font-bold text-rose-400">
              {formatCurrency(spentAmount)}
            </h3>

          </div>

          {/* Remaining */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">

            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FiDollarSign size={80} />
            </div>

            <p className="text-sm font-medium text-slate-400 mb-1">
              Remaining
            </p>

            <h3 className={`text-3xl font-bold ${remainingBudget >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatCurrency(remainingBudget)}
            </h3>

          </div>

        </div>

      </div>

      {/* Financial Summary */}
      <div>

        <h2 className="text-2xl font-bold text-white mb-5">
          This Year Financial Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Income */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">

            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FiTrendingUp size={80} />
            </div>

            <p className="text-sm font-medium text-slate-400 mb-1">
              Total Income
            </p>

            <h3 className="text-3xl font-bold text-emerald-400">
              {formatCurrency(summary.totalIncome)}
            </h3>

          </div>

          {/* Expense */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">

            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FiTrendingDown size={80} />
            </div>

            <p className="text-sm font-medium text-slate-400 mb-1">
              Total Expenses
            </p>

            <h3 className="text-3xl font-bold text-rose-400">
              {formatCurrency(summary.totalExpense)}
            </h3>

          </div>

          {/* Balance */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">

            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FiDollarSign size={80} />
            </div>

            <p className="text-sm font-medium text-slate-400 mb-1">
              Net Balance
            </p>

            <h3 className={`text-3xl font-bold ${summary.balance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>

              {formatCurrency(summary.balance)}

            </h3>

          </div>

        </div>

      </div>

      {/* Budget Progress */}
      {budget && (

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">

          <div className="flex justify-between items-center mb-3">

            <h3 className="text-lg font-bold text-white flex items-center">

              Budget Usage
     
              {budget.percentage >= 80 && (

                <FiAlertCircle className="ml-2 text-yellow-500" />

              )}

            </h3>

            <span className="text-sm font-medium text-slate-400">

              {formatCurrency(spentAmount)} / {formatCurrency(yearlyBudget)}

            </span>

          </div>

          <div className="w-full bg-slate-700 rounded-full h-4 mb-2 overflow-hidden">

            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                budget.percentage >= 100
                  ? 'bg-red-500'
                  : budget.percentage >= 80
                  ? 'bg-yellow-500'
                  : 'bg-emerald-500'
              }`}
              style={{
                width: `${Math.min(budget.percentage || 0, 100)}%`
              }}
            ></div>

          </div>

          <p className="text-xs text-slate-400 text-right">

            {Number(budget.percentage).toFixed(2)}% used

          </p>

        </div>

      )}

      {/* Recent Transactions */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">
            Recent Transactions
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-500/30 transition-all font-medium text-sm"
          >
            <FiPlus className="mr-1" />
            Add Transaction
          </button>
        </div>

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

              {expenses.slice(0, 5).map((exp) => (

                <tr
                  key={exp._id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors"
                >

                  <td className="py-4 px-4 text-slate-300">
                    {new Date(exp.date).toLocaleDateString()}
                  </td>

                  <td className="py-4 px-4 text-white font-medium">
                    {exp.description || 'N/A'}
                  </td>

                  <td className="py-4 px-4">

                    <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">

                      {exp.category || 'N/A'}

                    </span>

                  </td>

                  <td className="py-4 px-4">

                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        exp.type === 'income'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >

                      {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}

                    </span>

                  </td>

                  <td
                    className={`py-4 px-4 text-right font-bold ${
                      exp.type === 'income'
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }`}
                  >

                    {exp.type === 'income' ? '+' : '-'}

                    {formatCurrency(exp.amount)}

                  </td>

                </tr>

              ))}

              {expenses.length === 0 && (

                <tr>

                  <td
                    colSpan="5"
                    className="py-8 text-center text-slate-500"
                  >

                    No recent transactions. Add one to get started!

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Modal */}
      {isModalOpen && (

        <TransactionForm
          onClose={() => setIsModalOpen(false)}
        />

      )}

      {isBudgetModalOpen && (
        <BudgetForm 
          onClose={() => setIsBudgetModalOpen(false)}
          existingBudget={budget}
        />
      )}

    </div>
  );
};

export default Dashboard;