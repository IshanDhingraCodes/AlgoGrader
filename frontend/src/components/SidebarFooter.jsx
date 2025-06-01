import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import ThemeToggle from "./ui/ThemeToggle";
const SidebarFooter = () => {
  const { authUser } = useAuthStore();

  return (
    <footer className="space-y-3">
      <div className="flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start cursor-pointer">
        <ThemeToggle />
      </div>
      <Link
        to="/profile"
        className="flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start"
      >
        <img
          src={authUser?.image || "https://avatar.iran.liara.run/public/boy"}
          alt="User Avatar"
          className="object-cover size-6 xl:size-7"
        />
        <p className="text-16 font-semibold text-base max-xl:hidden">
          My Profile
        </p>
      </Link>

      <LogoutButton>
        <div className="flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start cursor-pointer">
          <LogOut />
          <p className="text-16 font-semibold text-base max-xl:hidden">
            Logout
          </p>
        </div>
      </LogoutButton>
    </footer>
  );
};

export default SidebarFooter;
