import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaWallet } from 'react-icons/fa'
import { AuthContext } from '../Context/AuthContext'

function Header() {

  const { user, logout } = useContext(AuthContext)

  const isLoggedIn = !!user

  const navigate = useNavigate()

  const handleLogout = () => {

    logout()

    navigate('/login')

  }

  return (

    <header className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >

          <div className="bg-blue-100 p-3 rounded-full shadow">

            <FaWallet className="text-blue-600 text-2xl" />

          </div>

          <h1 className="text-3xl font-extrabold text-blue-700">
            ExpenseTracker
          </h1>

        </div>

        {/* Navigation */}
        <nav>

          <ul className="flex items-center gap-8 text-lg font-semibold">

            {/* Home */}
            <li>

              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600 transition"
                }
              >
                Home
              </NavLink>

            </li>

            {/* After Login */}
            {isLoggedIn && (
              <>
                <li>

                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600 transition"
                    }
                  >
                    Dashboard
                  </NavLink>

                </li>

                <li>

                  <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600 transition"
                    }
                  >
                    Reports
                  </NavLink>

                </li>

                <li>

                  <NavLink
                    to="/aiinsights"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600 transition"
                    }
                  >
                    AI Insights
                  </NavLink>

                </li>

                <li>
                  <NavLink to="/profile" className="flex items-center gap-2">
                    {user?.profileImageUrl ? (
                      <img 
                        src={user.profileImageUrl} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-sm transition hover:scale-105" 
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-blue-500 shadow-sm transition hover:scale-105">
                        {user?.firstName ? user.firstName[0].toUpperCase() : 'U'}
                      </div>
                    )}
                  </NavLink>
                </li>

                <li>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition shadow-md"
                  >
                    Logout
                  </button>

                </li>
              </>
            )}

            {/* Before Login */}
            {!isLoggedIn && (
              <>
                <li>

                  <NavLink
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Login
                  </NavLink>

                </li>

                <li>

                  <NavLink
                    to="/signup"
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition shadow-md"
                  >
                    Sign Up
                  </NavLink>

                </li>
              </>
            )}

          </ul>

        </nav>

      </div>

    </header>

  )
}

export default Header