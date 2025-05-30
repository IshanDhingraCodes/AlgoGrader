import React, { useEffect, useState } from "react";
import { X, Plus, Loader } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";

const AddToPlaylist = ({ isOpen, onClose, problemId }) => {
  const { playlists, getAllPlaylists, addProblemToPlaylist, isLoading } =
    usePlaylistStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
    }
  }, [getAllPlaylists, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;

    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 sm:px-6 md:px-8"
      aria-modal="true"
      role="dialog"
      aria-labelledby="add-playlist-title"
    >
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl bg-white dark:bg-base-100 shadow-xl ring-1 ring-black/10 animate-fade-in transition-transform transform scale-95">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-base-300 px-5 py-4">
          <h2
            id="add-playlist-title"
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            Add to Playlist
          </h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 px-5 py-6">
          <div>
            <label
              htmlFor="playlist-select"
              className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
            >
              Select Playlist
            </label>
            <select
              id="playlist-select"
              className="select select-bordered w-full"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              disabled={isLoading}
              required
            >
              <option value="" disabled>
                Choose a playlist
              </option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline btn-sm"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm flex items-center gap-2"
              disabled={!selectedPlaylist || isLoading}
            >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Add to Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToPlaylist;
