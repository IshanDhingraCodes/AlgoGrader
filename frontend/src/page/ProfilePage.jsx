import React from "react";
import { Mail, User, Shield } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <h1 className="text-4xl font-bold text-start">
        Hello, <span className="text-primary">{authUser.name}</span>
      </h1>
      <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
        Here's your profile overview and account details.
      </p>

      {/* Profile Overview */}
      <div className="bg-base-300 rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col md:flex-row gap-8 items-center">
        <div className="avatar placeholder shrink-0">
          <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
            <img
              src={
                authUser?.image || "https://avatar.iran.liara.run/public/boy"
              }
              alt={authUser.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center md:items-start">
          <h2 className="text-2xl font-bold">{authUser.name}</h2>
          <p className="text-gray-500">{authUser.email}</p>
          <span className="badge badge-primary text-sm">{authUser.role}</span>
        </div>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3">
          <div className="flex items-center gap-3 text-primary">
            <Mail className="w-5 h-5" />
            <h3 className="font-semibold text-sm">Email</h3>
          </div>
          <p className="text-sm break-words">{authUser.email}</p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3">
          <div className="flex items-center gap-3 text-primary">
            <User className="w-5 h-5" />
            <h3 className="font-semibold text-sm">User ID</h3>
          </div>
          <p className="text-sm break-words">{authUser.id}</p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3">
          <div className="flex items-center gap-3 text-primary">
            <Shield className="w-5 h-5" />
            <h3 className="font-semibold text-sm">Role</h3>
          </div>
          <p className="text-sm">{authUser.role}</p>
          <span className="text-xs text-gray-500">
            {authUser.role === "ADMIN"
              ? "Full system access"
              : "Limited access"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
