import React, { useState, useMemo, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Bookmark, Loader2 } from "lucide-react";
import { useProblemStore } from "../store/useProblemStore";
import { usePlaylistStore } from "../store/usePlaylistStore";
import AddToPlaylist from "../components/AddToPlaylist";
import CreatePlaylistModal from "../components/CreatePlaylistModal";

const UserProblemTable = () => {
  const { authUser } = useAuthStore();
  const { problems, getAllProblems, isProblemsLoading } = useProblemStore();
  const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  const difficulties = ["EASY", "MEDIUM", "HARD"];

  // Filter problems based on search, difficulty, and tags
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  const handleOpenCreatePlaylistFromAdd = () => {
    setIsAddToPlaylistModalOpen(false);
    setIsCreatePlaylistModalOpen(true);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
    setIsCreatePlaylistModalOpen(false);
    setIsAddToPlaylistModalOpen(true);
  };

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-start">Problems</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search by title"
            className="input input-bordered max-w-7xl bg-base-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="select select-bordered bg-base-200"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="ALL">All Difficulties</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered bg-base-200"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="ALL">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="table table-zebra table-lg bg-base-200 text-base-content">
            <thead className="bg-base-300">
              <tr>
                <th>Solved</th>
                <th>Title</th>
                <th>Tags</th>
                <th>Difficulty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProblems.length > 0 ? (
                paginatedProblems.map((problem) => {
                  const isSolved = problem.solvedBy.some(
                    (user) => user.userId === authUser?.id
                  );
                  return (
                    <tr key={problem.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={isSolved}
                          readOnly
                          className="checkbox checkbox-sm rounded-sm cursor-default"
                        />
                      </td>
                      <td>
                        <Link
                          to={`/problem/${problem.id}`}
                          className="font-semibold hover:underline"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {(problem.tags || []).slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="badge badge-outline badge-warning text-xs font-bold p-4 rounded-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge font-semibold text-xs text-white rounded-sm ${
                            problem.difficulty === "EASY"
                              ? "badge-success"
                              : problem.difficulty === "MEDIUM"
                              ? "bg-orange-400"
                              : "badge-error"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td>
                        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                          <button
                            className="btn btn-sm btn-outline flex gap-2 items-center rounded-sm hover:bg-accent/70"
                            onClick={() => handleAddToPlaylist(problem.id)}
                          >
                            <Bookmark className="w-4 h-4" />
                            <span className="hidden lg:inline">
                              Save to Playlist
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No problems found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            className="btn btn-sm rounded-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-sm rounded-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <AddToPlaylist
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
        onCreatePlaylistClick={handleOpenCreatePlaylistFromAdd}
      />
      <CreatePlaylistModal
        isOpen={isCreatePlaylistModalOpen}
        onClose={() => setIsCreatePlaylistModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};

export default UserProblemTable;
