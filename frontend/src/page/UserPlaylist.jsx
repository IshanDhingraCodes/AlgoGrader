import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { Link } from "react-router-dom";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  List,
  Tag,
  ExternalLink,
  Trash2,
  Plus,
} from "lucide-react";

const UserPlaylist = () => {
  const {
    getAllPlaylists,
    playlists,
    deletePlaylist,
    createPlaylist,
    removeProblemFromPlaylist,
  } = usePlaylistStore();

  const { getSubmissionCountForProblem, submissionCount } =
    useSubmissionStore();

  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [removingProblemIds, setRemovingProblemIds] = useState(new Set());
  const [solvedProblems, setSolvedProblems] = useState({});

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  useEffect(() => {
    const fetchSubmissionCounts = async () => {
      const solved = {};
      for (const playlist of playlists) {
        if (playlist.problems && Array.isArray(playlist.problems)) {
          for (const item of playlist.problems) {
            const problemId = item.problem.id;
            await getSubmissionCountForProblem(problemId);
            solved[problemId] = submissionCount > 0;
          }
        }
      }
      setSolvedProblems(solved);
    };
    fetchSubmissionCounts();
  }, [playlists, getSubmissionCountForProblem, submissionCount]);

  const togglePlaylist = (id) => {
    setExpandedPlaylist((prev) => (prev === id ? null : id));
  };

  const handleDeletePlaylist = async (id) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      await deletePlaylist(id);
      if (expandedPlaylist === id) setExpandedPlaylist(null);
    }
  };

  const handleRemoveProblem = async (playlistId, problemId) => {
    setRemovingProblemIds((prev) => new Set(prev).add(problemId));
    try {
      if (window.confirm("Are you sure you want to delete this problem?")) {
        await removeProblemFromPlaylist(playlistId, [problemId]);
        getAllPlaylists();
      }
    } finally {
      setRemovingProblemIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(problemId);
        return newSet;
      });
    }
  };

  const getDifficultyBadge = (difficulty) => {
    const base = "badge font-semibold text-xs text-white rounded-sm";
    return (
      <span
        className={`${base} ${
          difficulty === "EASY"
            ? "badge-success"
            : difficulty === "MEDIUM"
            ? "badge-warning"
            : "badge-error"
        }`}
      >
        {difficulty}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `Created ${new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)}`;
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
    setIsCreateModalOpen(false);
  };

  const calculateProgress = (problems) => {
    if (!problems || problems.length === 0) return 0;
    const solvedCount = problems.filter(
      (item) => solvedProblems[item.problem.id]
    ).length;
    return Math.round((solvedCount / problems.length) * 100);
  };

  const getTotalProblems = (problems) => {
    return problems && Array.isArray(problems) ? problems.length : 0;
  };

  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-primary text-start w-full md:w-auto">
          My Playlists
        </h1>
        <button
          className="btn btn-primary w-full sm:w-auto rounded-lg"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {playlists.length === 0 ? (
        <div className="bg-base-200 p-8 rounded-xl text-center shadow-lg">
          <h3 className="text-2xl font-semibold mb-3">No playlists found</h3>
          <p className="text-base-content/70 mb-5">
            Create your first playlist to organize problems!
          </p>
          <button
            className="btn btn-primary btn-md rounded-lg"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Playlist
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {playlists.map((playlist) => {
            const totalProblems = getTotalProblems(playlist.problems);
            const progress = calculateProgress(playlist.problems);
            return (
              <div
                key={playlist.id}
                className="bg-base-200 rounded-xl p-5 sm:p-6 shadow hover:shadow-lg transition duration-300"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => togglePlaylist(playlist.id)}
                  role="button"
                >
                  <div className="flex items-center gap-5">
                    <div className="bg-primary text-primary-content rounded-lg w-12 h-12 flex items-center justify-center">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold">
                        {playlist.name}
                      </h3>
                      <div className="flex items-center gap-4 text-xs sm:text-sm text-base-content/70 mt-1">
                        <span className="flex items-center gap-1">
                          <List size={14} />
                          {totalProblems} problem{totalProblems !== 1 && "s"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {formatDate(playlist.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm">
                    {expandedPlaylist === playlist.id ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span>Progress: {progress}%</span>
                    <span>Total Problems: {totalProblems}</span>
                  </div>
                  <div className="w-full bg-base-300 rounded-lg h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-lg transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-base-content/80 mt-4 break-words">
                  {playlist.description}
                </p>

                {expandedPlaylist === playlist.id && (
                  <section className="mt-6 pt-6 border-t border-base-300 transition-all duration-300">
                    <h4 className="text-lg font-semibold mb-4">
                      Problems in this playlist
                    </h4>

                    {totalProblems === 0 ? (
                      <p className="text-base-content/70 italic">
                        No problems added to this playlist yet.
                      </p>
                    ) : (
                      <div className="overflow-x-auto rounded-xl shadow max-w-full">
                        <table className="table table-zebra table-sm sm:table-md bg-base-200 w-full text-sm sm:text-base">
                          <thead className="bg-base-300">
                            <tr>
                              <th>Solved</th>
                              <th className="min-w-[150px]">Title</th>
                              <th className="hidden lg:table-cell min-w-[120px]">
                                Tags
                              </th>
                              <th>Difficulty</th>
                              <th className="text-center min-w-[130px]">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {playlist.problems.map((item) => {
                              const problemId = item.problem.id;
                              const isRemoving =
                                removingProblemIds.has(problemId);
                              const isSolved = solvedProblems[problemId];
                              return (
                                <tr key={problemId}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      checked={isSolved}
                                      readOnly
                                      className="checkbox checkbox-sm rounded-sm cursor-default"
                                    />
                                  </td>
                                  <td className="font-medium truncate max-w-[200px]">
                                    <Link
                                      to={`/problem/${problemId}`}
                                      className="hover:underline block"
                                    >
                                      {item.problem.title}
                                    </Link>
                                  </td>
                                  <td className="hidden lg:table-cell">
                                    <div className="flex flex-wrap gap-1 max-w-[220px]">
                                      {item.problem.tags
                                        ?.slice(0, 2)
                                        .map((tag, idx) => (
                                          <span
                                            key={idx}
                                            className="badge badge-outline badge-warning text-xs font-bold p-1 rounded"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                    </div>
                                  </td>
                                  <td>
                                    {getDifficultyBadge(
                                      item.problem.difficulty
                                    )}
                                  </td>
                                  <td className="text-center flex gap-2 justify-center">
                                    <Link
                                      to={`/problem/${problemId}`}
                                      className="btn btn-sm btn-outline flex gap-1 items-center"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      <span className="hidden sm:inline">
                                        Solve
                                      </span>
                                    </Link>
                                    <button
                                      onClick={() =>
                                        handleRemoveProblem(
                                          playlist.id,
                                          problemId
                                        )
                                      }
                                      disabled={isRemoving}
                                      className="btn btn-sm btn-outline btn-error flex gap-1 items-center"
                                    >
                                      {isRemoving ? (
                                        <span className="loading loading-spinner loading-xs" />
                                      ) : (
                                        <>
                                          <Trash2 className="w-4 h-4" />
                                          <span className="hidden sm:inline">
                                            Remove
                                          </span>
                                        </>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <div className="flex justify-end mt-6">
                      <button
                        onClick={() => handleDeletePlaylist(playlist.id)}
                        className="btn btn-sm btn-error dark:opacity-70 dark:text-white font-bold rounded-lg"
                      >
                        Delete Playlist
                      </button>
                    </div>
                  </section>
                )}
              </div>
            );
          })}
        </div>
      )}

      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};

export default UserPlaylist;
