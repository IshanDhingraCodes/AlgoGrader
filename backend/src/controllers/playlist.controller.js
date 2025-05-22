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

export const getAllListDetails = asyncHandler(async (req, res) => {});
export const getPlayListDetails = asyncHandler(async (req, res) => {});
export const addProblemToPlaylist = asyncHandler(async (req, res) => {});
export const deletePlaylist = asyncHandler(async (req, res) => {});
export const removeProblemFromPlaylist = asyncHandler(async (req, res) => {});
