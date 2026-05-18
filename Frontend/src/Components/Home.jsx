import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaWallet, FaChartPie, FaRobot } from 'react-icons/fa'
import { AuthContext } from '../Context/AuthContext'

function Home() {

  const { user } = useContext(AuthContext)

  const isLoggedIn = !!user

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="text-center py-24 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">

        <div className="flex justify-center mb-6">

          <div className="bg-white p-5 rounded-full shadow-2xl">

            <FaWallet className="text-blue-600 text-5xl" />

          </div>

        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Smart Expense Tracker 💰
        </h1>

        <p className="text-xl max-w-3xl mx-auto leading-10 text-slate-100 mb-10">
          Track your income and expenses, analyze your spending habits,
          generate AI-powered financial insights, and manage your savings
          more effectively with beautiful reports and charts.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6">

          {!isLoggedIn ? (
            <>

              <Link
                to="/login"
                className="bg-white text-blue-700 px-8 py-3 rounded-xl text-lg font-bold hover:scale-105 transition duration-300 shadow-lg"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-yellow-400 text-slate-900 px-8 py-3 rounded-xl text-lg font-bold hover:scale-105 transition duration-300 shadow-lg"
              >
                Sign Up
              </Link>

            </>
          ) : (

            <Link
              to="/dashboard"
              className="bg-white text-blue-700 px-8 py-3 rounded-xl text-lg font-bold hover:scale-105 transition duration-300 shadow-lg"
            >
              Get Started
            </Link>

          )}

        </div>

      </div>

      {/* Features Section */}
      <div className="py-20 px-6">

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
          Why Use Expense Tracker?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition duration-300">

            <div className="flex justify-center mb-5">

              <div className="bg-blue-100 p-5 rounded-full">

                <FaWallet className="text-blue-600 text-4xl" />

              </div>

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Track Expenses
            </h3>

            <p className="text-gray-600 leading-8">
              Easily add and manage your daily expenses and income
              with a clean and simple interface.
            </p>

          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition duration-300">

            <div className="flex justify-center mb-5">

              <div className="bg-green-100 p-5 rounded-full">

                <FaChartPie className="text-green-600 text-4xl" />

              </div>

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Visual Reports
            </h3>

            <p className="text-gray-600 leading-8">
              Understand your spending patterns through
              graphical reports and expense summaries.
            </p>

          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition duration-300">

            <div className="flex justify-center mb-5">

              <div className="bg-purple-100 p-5 rounded-full">

                <FaRobot className="text-purple-600 text-4xl" />

              </div>

            </div>

            <h3 className="text-2xl font-bold mb-4">
              AI Insights
            </h3>

            <p className="text-gray-600 leading-8">
              Get AI-powered suggestions to improve
              your savings and reduce unnecessary spending.
            </p>

          </div>

        </div>

      </div>

      {/* About Section */}
      <div className="bg-white py-20 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Manage Your Money Smarter
          </h2>

          <p className="text-gray-600 text-xl leading-10">
            Our Expense Tracker helps you stay organized,
            monitor your financial activities, and achieve
            your savings goals with smart AI-driven analytics
            and easy-to-understand reports.
          </p>

        </div>

      </div>

    </div>

  )
}

export default Home