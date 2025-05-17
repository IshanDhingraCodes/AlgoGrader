import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { db } from "../libs/db.js";

export const getAllSubmission = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const submissions = await db.submission.findMany({
    where: {
      userId: userId,
    },
  });

  if (!submissions) {
    return res.status(404).json(new ApiError(404, "No submissions found."));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, submissions, "Submissions fetched successfully"),
    );
});

export const getSubmissionsForProblem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const problemId = req.params.problemId;

  const submissions = await db.submission.findMany({
    where: {
      userId: userId,
      problemId: problemId,
    },
  });

  if (!submissions) {
    return res.status(404).json(new ApiError(404, "No submissions found."));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, submissions, "Problem fetched successfully."));
});

export const getAllSubmissionsForProblem = asyncHandler(async (req, res) => {
  const problemId = req.params.problemId;

  const submission = await db.submission.count({
    where: {
      problemId: problemId,
    },
  });

  if (!submission) {
    return res.status(404).json(new ApiError(404, "No submission found."));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { count: submission },
        "Submissions fetched successfully.",
      ),
    );
});
