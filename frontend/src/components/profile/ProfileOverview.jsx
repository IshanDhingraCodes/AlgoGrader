import React from "react";

const ProfileOverview = ({ authUser }) => {
  return (
    <div className="bg-base-300 rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col md:flex-row gap-8 items-center">
      <div className="avatar placeholder shrink-0">
        <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
          <img
            src={authUser?.image || "https://avatar.iran.liara.run/public/boy"}
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
  );
};

export default ProfileOverview; 