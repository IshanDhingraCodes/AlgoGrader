import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = asyncHandler(async (req, res) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;

  const userId = req.user.id;

  //validate test cases

  if (
    !Array.isArray(stdin) ||
    stdin.length === 0 ||
    !Array.isArray(expected_outputs) ||
    expected_outputs.length !== stdin.length
  ) {
    return res
      .status(400)
      .json(new ApiError(400, "Invalid or Missing test cases"));
  }

  // Prepare each test case for judge0 batch submission

  const submissions = stdin.map((input) => ({
    source_code,
    language_id,
    stdin: input,
  }));

  // Send batch of submissions to judge0

  const submitResponse = await submitBatch(submissions);

  const tokens = submitResponse.map((res) => res.token);

  // Poll judge0 for results of all submitted test cases

  const results = await pollBatchResults(tokens);

  console.log("Result__________");
  console.log(results);

  return res.status(200).json({
    message: "Code Executed",
  });
});
