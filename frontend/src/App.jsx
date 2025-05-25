import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { HomePage, Landing, SignInPage, SignUpPage } from "./page";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import AuthLayout from "./layout/AuthLayout";
import ForgotPassword from "./page/ForgotPassword";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={!authUser ? <Landing /> : <Navigate to={"/home"} />}
        />
        <Route path="/" element={<AuthLayout />}>
          <Route
            path="/sign-in"
            element={!authUser ? <SignInPage /> : <Navigate to={"/home"} />}
          />
          <Route
            path="/sign-up"
            element={!authUser ? <SignUpPage /> : <Navigate to={"/home"} />}
          />
          <Route
            path="/forgot-password"
            element={!authUser ? <ForgotPassword /> : <Navigate to={"/home"} />}
          />
        </Route>
        <Route
          path="/home"
          element={authUser ? <HomePage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </>
  );
};

export default App;
