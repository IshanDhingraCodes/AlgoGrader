import { GoogleGenerativeAI } from "@google/generative-ai";
import rateLimit from "express-rate-limit";
import { db } from "../libs/db.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later.",
});

const conversationHistory = new Map();

const getSystemPrompt = (problem, language) => {
  return `You are a knowledgeable and supportive programming assistant helping a user with a coding problem.

Problem Details:
- **Title**: ${problem.title}
- **Description**: ${problem.description}
- **Difficulty**: ${problem.difficulty}
- **Tags**: ${problem.tags.join(", ")}
- **Preferred Language**: ${language}

Your role is to guide the user in understanding and solving this problem effectively. Follow these principles in your responses:

1. Be clear, concise, and educational—aim to teach, not just answer.
2. Focus on explaining concepts, strategies, and thought processes.
3. When asked for a solution, provide it with a detailed explanation.
4. Use minimal, illustrative code snippets to support your explanations.
5. Ask clarifying questions if the user's approach or intent is unclear.
6. If the user is stuck, guide them step-by-step and encourage exploration.
7. When relevant, explain key algorithms or data structures involved.
8. Format all code examples using proper syntax highlighting with language specification.
9. Offer gentle, constructive feedback on mistakes, with rationale.
10. Promote good coding habits and problem-solving techniques.
11. When showing code, always use the preferred language: ${language}.
12. Break down complex explanations into smaller, digestible parts.
13. Use analogies and real-world examples when helpful.
14. Encourage the user to think about edge cases and optimization.
15. Provide time and space complexity analysis when discussing solutions.

Be helpful, encouraging, and aim to improve the user's understanding with every interaction.`;
};

const formatResponse = (text) => {
  // Format code blocks with proper language specification
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
    return `\`\`\`${language || "plaintext"}\n${code.trim()}\n\`\`\``;
  });

  // Add line breaks for better readability
  text = text.replace(/\n\n/g, "\n\n");

  return text;
};

const discussProblem = async (req, res) => {
  try {
    const { problemId, message, history = [], language = 'Python' } = req.body;
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

    // Format the conversation history for the prompt
    const formattedHistory = history
      .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const systemMessage = `${getSystemPrompt(problem, language)}

Problem Constraints:
${constraintsList}

Test Cases:
${testCasesList}

Conversation so far:\n${formattedHistory}\nUser: ${message}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        {
          parts: [{ text: systemMessage }],
        },
      ],
    });

    const response = formatResponse(result.response.text());

    res.json({
      response,
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

// Clear conversation history when user changes problem
const clearConversation = (userId, problemId) => {
  const conversationKey = `${userId}-${problemId}`;
  conversationHistory.delete(conversationKey);
};

export { discussProblem, aiLimiter, clearConversation };
