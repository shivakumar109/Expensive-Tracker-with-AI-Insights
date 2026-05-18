import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const ExpensePieChart = ({ expenses }) => {
  const expenseOnly = expenses.filter(e => e.type === 'expense');
  
  const categoryTotals = expenseOnly.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#F43F5E', // rose
          '#3B82F6', // blue
          '#10B981', // emerald
          '#F59E0B', // amber
          '#8B5CF6', // purple
          '#14B8A6', // teal
          '#EC4899', // pink
          '#64748B', // slate
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: 'right', labels: { color: '#CBD5E1' } },
    },
  };

  return <Pie data={data} options={options} />;
};

export const IncomeExpenseBarChart = ({ expenses }) => {
  // Group by month
  const monthlyData = expenses.reduce((acc, curr) => {
    const month = new Date(curr.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    acc[month][curr.type] += curr.amount;
    return acc;
  }, {});

  const labels = Object.keys(monthlyData);

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: labels.map(l => monthlyData[l].income),
        backgroundColor: '#10B981', // emerald
        borderRadius: 4,
      },
      {
        label: 'Expense',
        data: labels.map(l => monthlyData[l].expense),
        backgroundColor: '#F43F5E', // rose
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#CBD5E1' } },
    },
    scales: {
      y: { ticks: { color: '#94A3B8' }, grid: { color: '#334155' } },
      x: { ticks: { color: '#94A3B8' }, grid: { display: false } }
    }
  };

  return <Bar data={data} options={options} />;
};

export const YearlyExpenseChart = ({ expenses }) => {
  // Group by year
  const yearlyData = expenses.reduce((acc, curr) => {
    const year = new Date(curr.date).getFullYear();
    if (!acc[year]) acc[year] = { income: 0, expense: 0 };
    acc[year][curr.type] += curr.amount;
    return acc;
  }, {});

  const labels = Object.keys(yearlyData).sort();

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: labels.map(l => yearlyData[l].income),
        backgroundColor: '#10B981', // emerald
        borderRadius: 4,
      },
      {
        label: 'Expense',
        data: labels.map(l => yearlyData[l].expense),
        backgroundColor: '#F43F5E', // rose
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#CBD5E1' } },
    },
    scales: {
      y: { ticks: { color: '#94A3B8' }, grid: { color: '#334155' } },
      x: { ticks: { color: '#94A3B8' }, grid: { display: false } }
    }
  };

  return <Bar data={data} options={options} />;
};