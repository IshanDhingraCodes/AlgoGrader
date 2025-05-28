import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { logo } from "../assets";
import MobileNav from "../components/MobileNav";

const DashboardLayout = () => {
  return (
    <main className="flex h-screen w-full">
      <Sidebar />
      <div className="flex size-full flex-col">
        <div className="flex h-16 items-center justify-between p-5 sm:p-8 md:hidden bg-base-300">
          <div className="flex font-semibold gap-2 text-lg">
            <img src={logo} alt="logo" height={30} width={30} />
            <p>AlgoGrader</p>
          </div>
          <div>
            <MobileNav />
          </div>
        </div>
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardLayout;
