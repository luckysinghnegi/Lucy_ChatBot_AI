import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Toaster } from 'react-hot-toast'

// All components imported here------------------/
import HomePage from './routes/HomePage/HomePage.jsx'
import DashBoardPage from "./routes/DashboardPage/DashBoardPage.jsx"
import ChatPage from "./routes/ChatPage/ChatPage.jsx"
import DashBoardLayout from "./layouts/dashBoardLayOut/DashBoardLayout.jsx"
import SignInPage from "./routes/SignInPage/SignInPage.jsx"
import SignUpPage from './routes/SignUpPage/SignUpPage.jsx'
import RootLayout from './layouts/rootLayOut/RootLayout.jsx'

// clerk authentication added here----------------/
import { ClerkProvider } from "@clerk/clerk-react";

const frontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

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
            path: '/dashboard/chat/:chatId',
            element: <ChatPage />
          }
        ]
      }
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}  frontendApi={frontendApi}>
      <Toaster position="top-center" reverseOrder={false}>
      </Toaster>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)
