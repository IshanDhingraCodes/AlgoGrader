import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, Landing, SignInPage, SignUpPage } from "./page";

const App = () => {
  let authUser = null;

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!authUser ? <Landing /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/sign-in"
          element={!authUser ? <SignInPage /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/sign-up"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/home"
          element={authUser ? <HomePage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </>
  );
};

export default App;
