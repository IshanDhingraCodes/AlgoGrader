import React from "react";
import { Mail, User, Shield } from "lucide-react";

const AccountDetails = ({ authUser }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Email Card */}
      <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3">
        <div className="flex items-center gap-3 text-primary">
          <Mail className="w-5 h-5" />
          <h3 className="font-semibold text-sm">Email</h3>
        </div>
        <p className="text-sm break-words">{authUser.email}</p>
      </div>

      {/* User ID Card */}
      <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3">
        <div className="flex items-center gap-3 text-primary">
          <User className="w-5 h-5" />
          <h3 className="font-semibold text-sm">User ID</h3>
        </div>
        <p className="text-sm break-words">{authUser.id}</p>
      </div>

      {/* Role Card */}
      <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3">
        <div className="flex items-center gap-3 text-primary">
          <Shield className="w-5 h-5" />
          <h3 className="font-semibold text-sm">Role</h3>
        </div>
        <p className="text-sm">{authUser.role}</p>
        <span className="text-xs text-gray-500">
          {authUser.role === "ADMIN" ? "Full system access" : "Limited access"}
        </span>
      </div>
    </div>
  );
};

export default AccountDetails; 