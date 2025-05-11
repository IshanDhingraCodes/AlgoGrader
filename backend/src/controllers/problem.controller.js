import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const createProblem = asyncHandler(async (req, res) => {
  //extract the data from the body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  // double check if user role is admin

  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json(new ApiError(403, "You are not allowed to create a problem"));
  }

  // judge0 provide the languageid here we are checking id using the util
  for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
    const languageId = getJudge0LanguageId(language);

    if (!languageId) {
      return res
        .status(400)
        .json(new ApiError(400, `Language ${language} is not supported`));
    }

    //creating data for submission
    const submissions = testcases.map(({ input, output }) => ({
      source_code: solutionCode,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));

    // judge0 solve the problem twice as first it gives token then through that token check the status if passed or failed
    const submissionResults = await submitBatch(submissions);

    const tokens = submissionResults.map((res) => res.token);

    //creating polling method to check the status
    const results = await pollBatchResults(tokens);

    //checking if the testcase success or failed
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      console.log("Result-----", result);

      if (result.status.id !== 3) {
        return res
          .status(400)
          .json(
            new ApiError(
              400,
              `Testcase ${i + 1} failed for language ${language}`,
            ),
          );
      }
    }
  }

  //save the problem to the database
  const newProblem = await db.problem.create({
    data: {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testcases,
      codeSnippets,
      referenceSolutions,
      userId: req.user.id,
    },
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { problem: newProblem },
        "Problem created successfully",
      ),
    );
});

export const getAllProblems = asyncHandler(async (req, res) => {});
export const getProblemById = asyncHandler(async (req, res) => {});
export const updateProblem = asyncHandler(async (req, res) => {});
export const deleteProblem = asyncHandler(async (req, res) => {});
export const getAllProblemsSolvedByUser = asyncHandler(async (req, res) => {});
