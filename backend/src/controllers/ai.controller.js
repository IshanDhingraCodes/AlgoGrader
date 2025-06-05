import { GoogleGenerativeAI } from "@google/generative-ai";
import rateLimit from "express-rate-limit";
import { db } from "../libs/db.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later.",
});

const getSystemPrompt = (problem) => {
  return `You are a knowledgeable and supportive programming assistant helping a user with a coding problem.

Problem Details:
- **Title**: ${problem.title}
- **Description**: ${problem.description}
- **Difficulty**: ${problem.difficulty}
- **Tags**: ${problem.tags.join(", ")}

Your role is to guide the user in understanding and solving this problem effectively. Follow these principles in your responses:

1. Be clear, concise, and educational—aim to teach, not just answer.
2. Focus on explaining concepts, strategies, and thought processes.
3. When asked for a solution, provide it with a detailed explanation.
4. Use minimal, illustrative code snippets to support your explanations.
5. Ask clarifying questions if the user's approach or intent is unclear.
6. If the user is stuck, guide them step-by-step and encourage exploration.
7. When relevant, explain key algorithms or data structures involved.
8. Format all code examples using proper syntax highlighting.
9. Offer gentle, constructive feedback on mistakes, with rationale.
10. Promote good coding habits and problem-solving techniques.

Be helpful, encouraging, and aim to improve the user's understanding with every interaction.`;
};

const formatResponse = (text) => {
  return text.replace(/```(\w+)?\n([\s\S]*?)```/g, (language, code) => {
    return `\`\`\`${language || ""}\n${code.trim()}\n\`\`\``;
  });
};

const discussProblem = async (req, res) => {
  try {
    const { problemId, message } = req.body;
    const userId = req.user?.id;

    const problem = await db.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const testcases = Array.isArray(problem.testcases)
      ? problem.testcases
      : JSON.parse(problem.testcases);
    const constraints =
      typeof problem.constraints === "string"
        ? problem.constraints
        : JSON.stringify(problem.constraints);

    const constraintsList = constraints
      .split("\n")
      .map((c) => `- ${c}`)
      .join("\n");
    const testCasesList = testcases
      .map(
        (tc, i) =>
          `Test Case ${i + 1}:\nInput: ${tc.input}\nExpected Output: ${tc.output}`,
      )
      .join("\n\n");

    const systemMessage = `${getSystemPrompt(problem)}

Problem Constraints:
${constraintsList}

Test Cases:
${testCasesList}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        {
          parts: [{ text: systemMessage }, { text: message }],
        },
      ],
    });

    const response = formatResponse(result.response.text());

    res.json({
      response,
      history: [
        { role: "user", content: message },
        { role: "assistant", content: response },
      ],
    });
  } catch (error) {
    console.error("Error in AI discussion:", error);

    if (error.message?.includes("API key")) {
      return res.status(500).json({ error: "AI service configuration error" });
    }
    if (error.message?.includes("quota")) {
      return res.status(503).json({
        error:
          "AI service is currently overloaded. Please try again in a moment.",
      });
    }
    if (error.message?.includes("model")) {
      return res.status(500).json({
        error: "AI model configuration error. Please contact support.",
      });
    }

    res.status(500).json({ error: "Failed to process AI discussion" });
  }
};

export { discussProblem, aiLimiter };
