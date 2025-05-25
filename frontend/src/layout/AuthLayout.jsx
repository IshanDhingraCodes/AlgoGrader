import React from "react";
import { Outlet } from "react-router-dom";
import { authImage } from "../assets";

const AuthLayout = () => {
  return (
    <div>
      <main className="flex min-h-screen w-full justify-between">
        <Outlet />

        {/* right side */}
        <div className="flex h-screen w-full sticky top-0 items-center justify-end max-lg:hidden">
          <div className="h-screen w-full">
            <img
              src={authImage}
              alt="authImage"
              className="h-screen w-full rounded-bl-[15%] rounded-[5%] p-5"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
