import React from "react";
import { CheckCircle, List, Code2, Activity } from "lucide-react";

const StatsGrid = ({ solvedProblems, userPlaylists, submissions, contributionData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Solved Problems Card */}
      <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3">
        <div className="flex items-center gap-3 text-primary">
          <CheckCircle className="w-5 h-5" />
          <h3 className="font-semibold text-sm">Problems Solved</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold">{solvedProblems.length}</p>
          <p className="text-sm text-gray-500">total</p>
        </div>
      </div>

      {/* My Playlists Card */}
      <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3">
        <div className="flex items-center gap-3 text-primary">
          <List className="w-5 h-5" />
          <h3 className="font-semibold text-sm">My Playlists</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold">{userPlaylists.length}</p>
          <p className="text-sm text-gray-500">collections</p>
        </div>
      </div>

      {/* Submissions Card */}
      <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3">
        <div className="flex items-center gap-3 text-primary">
          <Code2 className="w-5 h-5" />
          <h3 className="font-semibold text-sm">Total Submissions</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold">{submissions.length}</p>
          <p className="text-sm text-gray-500">attempts</p>
        </div>
      </div>

      {/* Streak Card */}
      <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3">
        <div className="flex items-center gap-3 text-primary">
          <Activity className="w-5 h-5" />
          <h3 className="font-semibold text-sm">Current Streak</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold">
            {contributionData.filter((count) => count > 0).length}
          </p>
          <p className="text-sm text-gray-500">days</p>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid; 