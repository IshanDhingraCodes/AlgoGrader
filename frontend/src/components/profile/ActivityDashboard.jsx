import React from "react";
import { Activity, Flame, Trophy, Calendar, Target } from "lucide-react";

const ActivityDashboard = ({ stats }) => {
  return (
    <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Activity Dashboard
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Streak */}
        <div className="bg-base-300 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-medium">Current Streak</h4>
          </div>
          <p className="text-2xl font-bold">{stats.currentStreak} days</p>
          <p className="text-sm text-base-content/70">Keep it up!</p>
        </div>

        {/* Best Streak */}
        <div className="bg-base-300 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-medium">Best Streak</h4>
          </div>
          <p className="text-2xl font-bold">{stats.bestStreak} days</p>
          <p className="text-sm text-base-content/70">Your record!</p>
        </div>

        {/* This Week's Progress */}
        <div className="bg-base-300 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-medium">This Week</h4>
          </div>
          <p className="text-2xl font-bold">
            {stats.thisWeekSubmissions} solved
          </p>
          <p className="text-sm text-base-content/70">Keep the momentum!</p>
        </div>

        {/* Success Rate */}
        <div className="bg-base-300 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-medium">Success Rate</h4>
          </div>
          <p className="text-2xl font-bold">{stats.successRate}%</p>
          <p className="text-sm text-base-content/70">Accepted submissions</p>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Recent Achievements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {stats.recentAchievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-base-300 p-3 rounded-lg flex items-center gap-3"
            >
              <div className="p-2 bg-primary/20 rounded-lg">
                <achievement.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-base-content/70">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityDashboard; 