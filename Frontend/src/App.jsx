import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Rootlayout from './Components/Rootlayout'
import Home from './Components/Home'
import Dashboard from './Components/Dashboard'
import AiInsights from './Components/AiInsights'
import Reports from './Components/Reports'
import Login from './Components/Login'
import Signup from './Components/Signup'
import UserProfile from './Components/UserProfile'
import { AuthProvider } from './Context/AuthContext'
import { ExpenseProvider } from './Context/ExpenseContext'
import { BudgetProvider } from './Context/BudgetContext'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './Components/ProtectedRoute'
import PublicRoute from './Components/PublicRoute'

function App() {

  const routerObj = createBrowserRouter([
    {
      path: '/',
      element: <Rootlayout />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'dashboard',
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )
        },
        {
          path: 'reports',
          element: (
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          )
        },
        {
          path: 'aiinsights',
          element: (
            <ProtectedRoute>
              <AiInsights />
            </ProtectedRoute>
          )
        },
        {
          path: 'login',
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          )
        },
        {
          path: 'signup',
          element: (
            <PublicRoute>
              <Signup />
            </PublicRoute>
          )
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          )
        }
      ]
    }
  ])

  return (

<AuthProvider>

  <ExpenseProvider>

    <BudgetProvider>

      <RouterProvider router={routerObj} />

    </BudgetProvider>

  </ExpenseProvider>

</AuthProvider>
  )
}

export default App