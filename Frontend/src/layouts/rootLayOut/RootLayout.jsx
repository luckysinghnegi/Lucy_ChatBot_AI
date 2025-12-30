import React, { useEffect } from "react";
import "./RootLayout.css";
import { Outlet, Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
  ClerkProvider
} from "@clerk/clerk-react";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function SaveUserToDB() {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    const saveUser = async () => {
      const token = await getToken();

      await fetch("http://localhost:3000/api/user/save", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };

    saveUser();
  }, [isSignedIn]);
}

function RootLayout() {
  return (
    <div className="rootLayout">
      <SaveUserToDB />
      <header className="navbar">
        <Link to="/" className="logo-wrapper">
          <img src="/logo.png" className="logo" alt="logo" />
          <span className="Lucy">LucyAI</span>
        </Link>

        <div className="user">
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
