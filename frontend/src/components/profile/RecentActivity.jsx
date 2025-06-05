import React from "react";
import { Star, Clock, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const RecentActivity = ({ recentActivity }) => {
  return (
    <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-primary" />
        Recent Activity
      </h3>
      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 p-4 bg-base-300 rounded-lg hover:bg-base-400 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Link
                  to={`/problem/${activity.problemId}`}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {activity.problemTitle}
                </Link>
                <span className="text-xs text-base-content/60">
                  {activity.language}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-base-content/70">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(activity.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
                {activity.time && (
                  <span className="flex items-center gap-1">
                    <Activity className="w-4 h-4" />
                    {(() => {
                      try {
                        const time = JSON.parse(activity.time);
                        return Array.isArray(time) ? `${time[0]}s` : activity.time;
                      } catch {
                        return activity.time;
                      }
                    })()}
                  </span>
                )}
              </div>
            </div>
            <span
              className={`badge badge-lg ${
                activity.status === "Accepted"
                  ? "badge-success"
                  : "badge-error"
              }`}
            >
              {activity.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity; 