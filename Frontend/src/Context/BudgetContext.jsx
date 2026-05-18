import React, {
  createContext,
  useState,
  useEffect,
  useContext
} from 'react';

import axiosInstance from '../Services/axiosInstance';

import { AuthContext } from './AuthContext';

import toast from 'react-hot-toast';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {

  const { user } = useContext(AuthContext);

  const [budget, setBudget] = useState(null);

  const [loading, setLoading] = useState(false);

  // Fetch Budget
  const fetchBudget = async () => {

    if (!user) return;

    try {

      setLoading(true);

      const res = await axiosInstance.get(
        '/budget-api/check-budget'
      );

      setBudget(res.data.payload);

    }
    catch (error) {

      if (error.response?.status === 404) {

        setBudget(null);

      } else {

        console.error(error);

        toast.error(
          error.response?.data?.message ||
          'Failed to fetch budget'
        );

      }

    }
    finally {

      setLoading(false);

    }
  };

  // Add Budget
  const addBudget = async (budgetData) => {

    try {

      await axiosInstance.post(
        '/budget-api/budget',
        budgetData
      );

      toast.success('Budget added successfully');

      fetchBudget();

    }
    catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        'Failed to add budget'
      );

      throw error;
    }
  };

  // Update Budget
  const updateBudget = async (amount) => {

    try {

      await axiosInstance.put(
        `/budget-api/budget/${amount}`
      );

      toast.success('Budget updated successfully');

      fetchBudget();

    }
    catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        'Failed to update budget'
      );

      throw error;
    }
  };

  // Load budget when user logs in
  useEffect(() => {

    if (user) {

      fetchBudget();

    }
    else {

      setBudget(null);

    }

  }, [user]);

  return (

    <BudgetContext.Provider
      value={{
        budget,
        loading,
        fetchBudget,
        addBudget,
        updateBudget
      }}
    >

      {children}

    </BudgetContext.Provider>

  );
};