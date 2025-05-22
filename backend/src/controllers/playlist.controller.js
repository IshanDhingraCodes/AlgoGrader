import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const userId = req.user.id;

  const playlist = await db.playlist.create({
    data: {
      name,
      description,
      userId,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created successfully."));
});

export const getAllListDetails = asyncHandler(async (req, res) => {
  const playlists = await db.playlist.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      problems: {
        include: {
          problem: true,
        },
      },
    },
  });

  res
    .status(200)
    .json(new ApiResponse(200, playlists, "Playlists fetched successfully."));
});

export const getPlayListDetails = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  const playlist = await db.playlist.findUnique({
    where: {
      id: playlistId,
      userId: req.user.id,
    },
    include: {
      problems: {
        include: {
          problem: true,
        },
      },
    },
  });

  if (!playlist) {
    return res.status(404).json(new ApiError(404, "Playlist not found."));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fetched successfully."));
});

export const addProblemToPlaylist = asyncHandler(async (req, res) => {});
export const deletePlaylist = asyncHandler(async (req, res) => {});
export const removeProblemFromPlaylist = asyncHandler(async (req, res) => {});
