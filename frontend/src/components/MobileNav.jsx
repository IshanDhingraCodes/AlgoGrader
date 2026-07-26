import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { adminLinks, sidebarLinks } from "../constants";
import { Code, LogOut, Menu, X } from "lucide-react";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ui/ThemeToggle";
import UserAvatar from "./UserAvatar";
import { logo } from "../assets";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser } = useAuthStore();
  const { pathname } = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const getLinkClasses = (route) =>
    `flex gap-3 items-center py-2 px-4 rounded-lg ${
      pathname === route
        ? "bg-primary text-white font-bold"
        : "text-base-content hover:bg-base-300"
    }`;

  return (
    <div className="relative">
      {/* Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="p-2 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 right-0 w-64 bg-base-200 border-l border-base-300 shadow-lg flex flex-col p-4 z-50 md:hidden">
          {/* Logo */}
          <Link
            to="/home"
            className="mb-6 flex items-center gap-2"
            onClick={toggleMenu}
          >
            <img src={logo} alt="logo" height={30} width={30} />
            <h1 className="text-xl font-bold">AlgoGrader</h1>
          </Link>

          {/* User Links */}
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((item, i) => (
              <Link
                key={i}
                to={item.route}
                className={getLinkClasses(item.route)}
                onClick={toggleMenu}
              >
                <item.icon className="size-5" />
                <p className="text-base font-semibold">{item.label}</p>
              </Link>
            ))}

            {/* Admin Links */}
            {authUser?.role === "ADMIN" && (
              <div className="flex flex-col gap-1">
                <div className="border-t border-gray-500 dark:border-accent " />
                <p className="text-xs font-semibold uppercase text-base-content px-2 max-xl:hidden text-center my-2">
                  Admin Tools
                </p>
                {adminLinks.map((item, i) => (
                  <Link
                    key={i}
                    to={item.route}
                    className={getLinkClasses(item.route)}
                    onClick={toggleMenu}
                  >
                    <item.icon className="size-5" />
                    <p className="text-base font-semibold">{item.label}</p>
                  </Link>
                ))}
              </div>
            )}
          </nav>

          {/* Footer Section */}
          <div className="mt-auto pt-4 space-y-2 ">
            <div className={getLinkClasses("/theme-toggle")}>
              <ThemeToggle />
            </div>
            <Link
              to="/profile"
              className={getLinkClasses("/profile")}
              onClick={toggleMenu}
            >
              <UserAvatar user={authUser} className="size-5" />
              <p className="text-base font-semibold">My Profile</p>
            </Link>
            <LogoutButton>
              <div className={getLinkClasses("/logout")} onClick={toggleMenu}>
                <LogOut className="size-5" />
                <p className="text-base font-semibold">Logout</p>
              </div>
            </LogoutButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
