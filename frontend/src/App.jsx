import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, Landing, LoginPage, SignUpPage } from "./page";

const App = () => {
  let authUser = null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!authUser ? <Landing /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/signup"
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
