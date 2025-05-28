import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

const CreatePlaylistModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-base-100 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-base-300">
          <h2 className="text-2xl font-semibold">Create New Playlist</h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="px-6 py-6 space-y-5"
        >
          {/* Playlist Name */}
          <div>
            <label className="label">
              <span className="label-text text-base font-medium">
                Playlist Name
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. Dynamic Programming Mastery"
              className="input input-bordered w-full"
              {...register("name", { required: "Playlist name is required" })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-error">{errors.name.message}</p>
            )}
          </div>

          {/* Playlist Description */}
          <div>
            <label className="label">
              <span className="label-text text-base font-medium">
                Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-28"
              placeholder="Optional: Add a short description for your playlist"
              {...register("description")}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
