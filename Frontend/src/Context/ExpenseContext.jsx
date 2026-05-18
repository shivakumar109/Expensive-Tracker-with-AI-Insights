import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../Services/axiosInstance';
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axiosInstance.get('/expense-api/expenses?limit=1000');
      setExpenses(res.data.payload);
      
      const sumRes = await axiosInstance.get('/expense-api/summary');
      if (sumRes.data) {
        setSummary(sumRes.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBudget = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.get('/budget-api/check-budget');
      setBudget(res.data.payload);
    } catch (error) {
      if (error.response?.status === 404) {
        setBudget(null); // Normal if user hasn't created a budget yet
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchExpenses();
      fetchBudget();
    } else {
      setExpenses([]);
      setBudget(null);
      setSummary({ totalIncome: 0, totalExpense: 0, balance: 0 });
    }
  }, [user]);

  const addExpense = async (expenseData) => {
    try {
      await axiosInstance.post('/expense-api/expenses', expenseData);
      toast.success('Transaction added');
      fetchExpenses();
      fetchBudget();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add');
      throw error;
    }
  };

  const editExpense = async (id, expenseData) => {
    try {
      await axiosInstance.put(`/expense-api/expenses/${id}`, expenseData);
      toast.success('Transaction updated');
      fetchExpenses();
      fetchBudget();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update');
      throw error;
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`/expense-api/expenses/${id}`);
      toast.success('Transaction deleted');
      fetchExpenses();
      fetchBudget();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete');
      throw error;
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, budget, summary, loading, fetchExpenses, fetchBudget, addExpense, editExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
