import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Rootlayout from './Components/Rootlayout'
import Home from './Components/Home'
import Dashboard from './Components/Dashboard'
import AiInsights from './Components/AiInsights'
import Reports from './Components/Reports'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { AuthProvider } from './Context/AuthContext'
import { ExpenseProvider } from './Context/ExpenseContext'
import { BudgetProvider } from './Context/BudgetContext'
import { Toaster } from 'react-hot-toast'

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
          element: <Dashboard />
        },
        {
          path: 'reports',
          element: <Reports />
        },
        {
          path: 'aiinsights',
          element: <AiInsights />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
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