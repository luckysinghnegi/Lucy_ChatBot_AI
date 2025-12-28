import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomePage from './routes/HomePage/HomePage.jsx'
import DashBoardPage from "./routes/DashboardPage/DashBoardPage.jsx"
import ChatPage from "./routes/ChatPage/ChatPage.jsx"
import DashBoardLayout from "./layouts/dashBoardLayOut/DashBoardLayout.jsx"
import SignInPage from "./routes/SignInPage/SignInPage.jsx"
import SignUpPage from './routes/SignUpPage/SignUpPage.jsx'
import RootLayout from './layouts/rootLayOut/RootLayout.jsx'

// All routers here
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/sign-in/*',
        element: <SignInPage />
      },
      {
        path: '/sign-up/*',
        element: <SignUpPage />
      },
      {
        element: <DashBoardLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashBoardPage />
          }, {
            path: '/dashboard/chat/:id',
            element: <ChatPage />
          }
        ]
      }
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
