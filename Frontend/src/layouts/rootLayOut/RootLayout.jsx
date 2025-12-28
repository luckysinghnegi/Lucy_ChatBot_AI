import React from 'react'
import "./RootLayout.css"
import { Outlet, Link } from "react-router-dom"
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.log("not working key")
  throw new Error('Missing Publishable Key')
}

function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
      <div className='rootLayout'>
        <header>
          <Link to="/">
            <div className='right-navBar'>
              <img src="/logo.png" className='logo' alt="logo" />
              <div className='Lucy'>
                LucyAI
              </div>
            </div>
          </Link>
          <div className="user">
            <header>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  )
}

export default RootLayout