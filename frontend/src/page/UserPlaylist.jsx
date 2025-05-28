import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
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
} from "lucide-react";

const UserPlaylist = () => {
  const { getAllPlaylists, playlists, deletePlaylist, createPlaylist } =
    usePlaylistStore();
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const togglePlaylist = (id) => {
    setExpandedPlaylist((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (id) => {
    await deletePlaylist(id);
  };

  const getDifficultyBadge = (difficulty) => {
    const base = "badge badge-sm";
    switch (difficulty) {
      case "EASY":
        return <span className={`${base} badge-success`}>Easy</span>;
      case "MEDIUM":
        return <span className={`${base} badge-warning`}>Medium</span>;
      case "HARD":
        return <span className={`${base} badge-error`}>Hard</span>;
      default:
        return <span className={base}>Unknown</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold z-10 text-start text-primary">
          My Playlists
        </h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Playlist
        </button>
      </div>

      {playlists.length === 0 ? (
        <div className="bg-base-300 p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-medium mb-2">No playlists found</h3>
          <p className="text-base-content/70">
            Create your first playlist to organize problems!
          </p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Playlist
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-base-300 rounded-lg p-5 shadow hover:shadow-lg transition"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => togglePlaylist(playlist.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary text-primary-content rounded-lg w-12 h-12 flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{playlist.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-base-content/70 mt-1">
                      <span className="flex items-center gap-1">
                        <List size={14} />
                        {playlist.length} problems
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        Created {formatDate(playlist.createdAt)}
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

              <p className="text-base-content/80 mt-3">
                {playlist.description}
              </p>

              {expandedPlaylist === playlist.id && (
                <div className="mt-4 pt-4 border-t border-base-300">
                  <h4 className="text-lg font-semibold mb-3">
                    Problems in this playlist
                  </h4>

                  {playlist.length === 0 ? (
                    <p className="text-base-content/70">
                      No problems added to this playlist yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="table table-zebra w-full">
                        <thead>
                          <tr>
                            <th>Problem</th>
                            <th>Difficulty</th>
                            <th>Tags</th>
                            <th className="text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {playlist.problems.map((item) => (
                            <tr key={item.id}>
                              <td className="font-medium">
                                {item.problem.title}
                              </td>
                              <td>
                                {getDifficultyBadge(item.problem.difficulty)}
                              </td>
                              <td>
                                <div className="flex flex-wrap gap-1">
                                  {item.problem.tags?.map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="badge badge-outline badge-sm"
                                    >
                                      <Tag size={10} className="mr-1" />
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="text-right">
                                <Link
                                  to={`/problem/${item.problem.id}`}
                                  className="btn btn-xs btn-outline btn-primary"
                                >
                                  <ExternalLink size={12} className="mr-1" />
                                  Solve
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDelete(playlist.id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete Playlist
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
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
