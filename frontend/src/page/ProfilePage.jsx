import React, { useEffect, useMemo, useState } from "react";
import { Calendar, Flame, Target, Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useProblemStore } from "../store/useProblemStore";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import "react-calendar-heatmap/dist/styles.css";
import { toast } from "react-hot-toast";

// Import modular components
import ProfileOverview from "../components/profile/ProfileOverview";
import StatsGrid from "../components/profile/StatsGrid";
import ContributionGraph from "../components/profile/ContributionGraph";
import ActivityDashboard from "../components/profile/ActivityDashboard";
import ProblemTags from "../components/profile/ProblemTags";
import RecentActivity from "../components/profile/RecentActivity";
import AccountDetails from "../components/profile/AccountDetails";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const { solvedProblems, getAllProblems, getSolvedProblemByUser } =
    useProblemStore();
  const { playlists } = usePlaylistStore();
  const { getAllSubmissions, submissions } = useSubmissionStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await Promise.all([
          getAllProblems(),
          getSolvedProblemByUser(),
          getAllSubmissions(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load profile data. Please try again later.");
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [getAllProblems, getSolvedProblemByUser, getAllSubmissions]);

  const userPlaylists = useMemo(() => {
    if (!playlists || !authUser) return [];
    return playlists.filter((playlist) => playlist.userId === authUser.id);
  }, [playlists, authUser]);

  // Calculate statistics only when submissions are available
  const stats = useMemo(() => {
    if (!submissions || !Array.isArray(submissions)) {
      return {
        currentStreak: 0,
        bestStreak: 0,
        thisWeekSubmissions: 0,
        successRate: 0,
        recentAchievements: [],
      };
    }

    // Current Streak
    let currentStreak = 0;
    let currentDate = new Date();
    while (true) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const daySubmissions = submissions.filter(
        (s) =>
          s?.createdAt &&
          new Date(s.createdAt).toISOString().split("T")[0] === dateStr
      );
      if (daySubmissions.length === 0) break;
      currentStreak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Best Streak
    let maxStreak = 0;
    let streak = 0;
    let lastDate = null;

    const sortedSubmissions = [...submissions]
      .filter((s) => s?.createdAt)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    sortedSubmissions.forEach((submission) => {
      const currentDate = new Date(submission.createdAt)
        .toISOString()
        .split("T")[0];
      if (lastDate === null) {
        streak = 1;
      } else {
        const daysDiff = Math.floor(
          (new Date(currentDate) - new Date(lastDate)) / (1000 * 60 * 60 * 24)
        );
        if (daysDiff === 1) {
          streak++;
        } else {
          maxStreak = Math.max(maxStreak, streak);
          streak = 1;
        }
      }
      lastDate = currentDate;
    });
    const bestStreak = Math.max(maxStreak, streak);

    // This Week's Submissions
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekSubmissions = submissions.filter(
      (s) => s?.createdAt && new Date(s.createdAt) >= oneWeekAgo
    ).length;

    // Success Rate
    const accepted = submissions.filter((s) => s?.status === "Accepted").length;
    const successRate =
      submissions.length > 0
        ? Math.round((accepted / submissions.length) * 100)
        : 0;

    // Recent Achievements
    const achievements = [];

    if (currentStreak >= 3) {
      achievements.push({
        icon: Flame,
        title: "3 Day Streak",
        description: "Maintained a 3-day solving streak",
      });
    }
    if (currentStreak >= 7) {
      achievements.push({
        icon: Flame,
        title: "Week Warrior",
        description: "Maintained a 7-day solving streak",
      });
    }
    if (successRate >= 50) {
      achievements.push({
        icon: Target,
        title: "Consistent Solver",
        description: "Maintained 50% success rate",
      });
    }
    if (successRate >= 75) {
      achievements.push({
        icon: Target,
        title: "Problem Master",
        description: "Maintained 75% success rate",
      });
    }
    if (thisWeekSubmissions >= 5) {
      achievements.push({
        icon: Calendar,
        title: "Active Week",
        description: "Solved 5+ problems this week",
      });
    }

    return {
      currentStreak,
      bestStreak,
      thisWeekSubmissions,
      successRate,
      recentAchievements: achievements.slice(0, 3),
    };
  }, [submissions]);

  // Calculate contribution data for the last 30 days
  const contributionData = useMemo(() => {
    const data = Array(30).fill(0);
    const today = new Date();

    submissions?.forEach((submission) => {
      if (!submission?.createdAt) return;
      const submissionDate = new Date(submission.createdAt);
      const daysDiff = Math.floor(
        (today - submissionDate) / (1000 * 60 * 60 * 24)
      );
      if (daysDiff < 30) {
        data[29 - daysDiff]++;
      }
    });

    return data;
  }, [submissions]);

  // Calculate skill distribution
  const skillDistribution = useMemo(() => {
    if (!solvedProblems || !Array.isArray(solvedProblems)) return [];
    const skills = {};
    solvedProblems.forEach((problem) => {
      problem.tags?.forEach((tag) => {
        skills[tag] = (skills[tag] || 0) + 1;
      });
    });
    return Object.entries(skills).sort((a, b) => b[1] - a[1]);
  }, [solvedProblems]);

  // Get recent activity
  const recentActivity = useMemo(() => {
    if (!submissions || !Array.isArray(submissions)) return [];
    return [...submissions]
      .filter((s) => s?.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [submissions]);

  // Prepare heatmap data from submissions
  const heatmapData = useMemo(() => {
    if (!submissions || !Array.isArray(submissions)) return [];

    const dateMap = {};
    submissions.forEach((s) => {
      if (!s?.createdAt) return;
      const date = new Date(s.createdAt).toISOString().split("T")[0];
      dateMap[date] = (dateMap[date] || 0) + 1;
    });
    return Object.entries(dateMap).map(([date, count]) => ({ date, count }));
  }, [submissions]);

  // Calculate start date for 52 weeks ago (1 year)
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 7 * 51);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-error text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <ProfileOverview authUser={authUser} />

      <StatsGrid
        solvedProblems={solvedProblems}
        userPlaylists={userPlaylists}
        submissions={submissions}
        contributionData={contributionData}
      />

      <ContributionGraph
        startDate={startDate}
        endDate={today}
        heatmapData={heatmapData}
      />

      <ActivityDashboard stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProblemTags skillDistribution={skillDistribution} />
        <RecentActivity recentActivity={recentActivity} />
      </div>

      <AccountDetails authUser={authUser} />
    </div>
  );
};

export default ProfilePage;
