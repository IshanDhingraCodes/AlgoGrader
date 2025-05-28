import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logo } from "../assets";
import { sidebarLinks } from "../constants";
import SidebarFooter from "./SidebarFooter";
import { useAuthStore } from "../store/useAuthStore";
import { Code } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthStore();
  const { pathname } = useLocation();

  const getLinkClasses = (route) =>
    `flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start transition-colors duration-200 ${
      pathname === route
        ? "bg-primary text-white font-bold"
        : "text-base-content hover:bg-base-300"
    }`;

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-base-300 bg-base-200 pt-8 text-base max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px] z-10">
      <nav className="flex flex-col gap-4">
        {/* Logo */}
        <Link
          to="/home"
          className="mb-12 cursor-pointer items-center gap-2 flex"
        >
          <img
            src={logo}
            alt="logo"
            height={34}
            width={34}
            className="size-[24px] max-xl:size-10 ml-2"
          />
          <h1 className="text-[25px] leading-[32px] font-bold max-xl:hidden xl:pr-4">
            AlgoGrader
          </h1>
        </Link>

        {/* User Links */}
        <div className="flex flex-col gap-2">
          {sidebarLinks.map((item, i) => (
            <Link
              key={i}
              to={item.route}
              className={getLinkClasses(item.route)}
            >
              <item.icon />
              <p className="text-16 font-semibold text-base max-xl:hidden whitespace-nowrap truncate">
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Admin Links */}
        {authUser?.role === "ADMIN" && (
          <div className="flex flex-col gap-2 mt-6">
            <div className="border-t border-gray-500 dark:border-accent my-2" />
            <p className="text-xs font-semibold uppercase text-base-content px-2 max-xl:hidden">
              Admin Tools
            </p>
            <Link to="/add-problem" className={getLinkClasses("/add-problem")}>
              <Code />
              <p className="text-16 font-semibold text-base max-xl:hidden whitespace-nowrap truncate">
                Add Problem
              </p>
            </Link>
          </div>
        )}
      </nav>

      <SidebarFooter />
    </section>
  );
};

export default Sidebar;
