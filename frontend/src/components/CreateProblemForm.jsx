import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { problemSchema } from "../schema/problem.validation";
import { useProblemStore } from "../store/useProblemStore";

const sampledpData = {
  title: "Climbing Stairs",
  category: "dp",
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    { input: "2", output: "2" },
    { input: "3", output: "3" },
    { input: "4", output: "5" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];

/* Alternative approach with O(1) space
let a = 1; // ways to climb 1 step
let b = 2; // ways to climb 2 steps

for (let i = 3; i <= n; i++) {
  let temp = a + b;
  a = b;
  b = temp;
}

return n === 1 ? a : b;
*/
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]
      
      # Alternative approach with O(1) space
      # a, b = 1, 2
      # 
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      // Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
      
      /* Alternative approach with O(1) space */
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
};

const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints: "1 <= s.length <= 2 * 10^5",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testcases: [
    { input: "A man, a plan, a canal: Panama", output: "true" },
    { input: "race a car", output: "false" },
    { input: " ", output: "true" },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  rl.on('line', (line) => {
    const result = isPalindrome(line);
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    sol = Solution()
    result = sol.isPalindrome(s)
    print(str(result).lower())`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  rl.on('line', (line) => {
    const result = isPalindrome(line);
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        filtered_chars = [c.lower() for c in s if c.isalnum()]
        return filtered_chars == filtered_chars[::-1]

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    sol = Solution()
    result = sol.isPalindrome(s)
    print(str(result).lower())`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}`,
  },
};

const defaultFormValues = {
  testcases: [{ input: "", output: "" }],
  tags: [""],
  examples: {
    JAVASCRIPT: { input: "", output: "", explanation: "" },
    PYTHON: { input: "", output: "", explanation: "" },
    JAVA: { input: "", output: "", explanation: "" },
  },
  codeSnippets: {
    JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
    PYTHON: "def solution():\n    # Write your code here\n    pass",
    JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
  },
  referenceSolutions: {
    JAVASCRIPT: "// Add your reference solution here",
    PYTHON: "# Add your reference solution here",
    JAVA: "// Add your reference solution here",
  },
};

const CreateProblemForm = () => {
  const [sampleType, setSampleType] = useState("DP");
  const [collapsedSections, setCollapsedSections] = useState({
    JAVASCRIPT: true,
    PYTHON: true,
    JAVA: true,
  });
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: defaultFormValues,
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestCases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const { createProblem } = useProblemStore();
  const [isLoading, setIsLoading] = useState(false);

  const toggleSection = (language) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [language]: !prev[language],
    }));
  };

  const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem;
    replaceTags(sampleData.tags);
    replaceTestCases(sampleData.testcases);
    reset(sampleData);
  };

  const onSubmit = async (value) => {
    try {
      setIsLoading(true);
      await createProblem(value);
      reset(defaultFormValues);
      navigate("/add-problem");
    } catch (error) {
      console.error("Error creating problem:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card ">
      <div className="card-body">
        <div className="flex flex-col justify-between items-start gap-6 mb-8 pb-6 border-b border-base-300">
          <h2 className="card-title text-4xl font-bold text-start">
            Create Problem
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <button
              type="button"
              className={`btn join-item btn-sm rounded-md ${
                sampleType === "DP" ? "btn-primary" : "btn-outline btn-base-100"
              } hover:bg-primary hover:text-white transition-colors duration-200`}
              onClick={() => setSampleType("DP")}
            >
              DP Problem
            </button>
            <button
              type="button"
              className={`btn join-item btn-sm rounded-md ${
                sampleType === "string"
                  ? "btn-primary"
                  : "btn-outline btn-base-100"
              } hover:bg-primary hover:text-white transition-colors duration-200`}
              onClick={() => setSampleType("string")}
            >
              String Problem
            </button>
            <button
              type="button"
              className="btn btn-outline btn-secondary btn-sm rounded-md flex items-center gap-2 hover:bg-secondary hover:text-white transition-colors duration-200"
              onClick={loadSampleData}
            >
              <Download className="w-4 h-4" />
              Load Sample
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Basic Information */}
          <div className="card bg-base-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-lg font-medium">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full text-base py-3"
                  {...register("title")}
                  placeholder="Enter problem title"
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.title.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Description
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered min-h-40 w-full text-base p-4 resize-y"
                  {...register("description")}
                  placeholder="Enter problem description"
                />
                {errors.description && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.description.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Difficulty
                  </span>
                </label>
                <select
                  className="select select-bordered w-full text-base"
                  {...register("difficulty")}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
                {errors.difficulty && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.difficulty.message}
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="card bg-base-200 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Tags
              </h3>
              <button
                type="button"
                className="btn btn-primary btn-sm rounded-md"
                onClick={() => appendTag("")}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Tag
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tagFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="input input-bordered flex-1 text-base py-2"
                    {...register(`tags.${index}`)}
                    placeholder="Enter tag"
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-square btn-sm hover:bg-error hover:text-white"
                    onClick={() => removeTag(index)}
                    disabled={tagFields.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.tags && (
              <div className="mt-4">
                <span className="text-error text-sm">
                  {errors.tags.message}
                </span>
              </div>
            )}
          </div>

          {/* Test Cases */}
          <div className="card bg-base-200 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                Test Cases
              </h3>
              <button
                type="button"
                className="btn btn-primary btn-sm rounded-md"
                onClick={() => appendTestCase({ input: "", output: "" })}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Test Case
              </button>
            </div>
            <div className="space-y-6">
              {testCaseFields.map((field, index) => (
                <div
                  key={field.id}
                  className="card bg-base-100 shadow-md rounded-lg"
                >
                  <div className="card-body p-4 md:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold">
                        Test Case #{index + 1}
                      </h4>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-white rounded-md"
                        onClick={() => removeTestCase(index)}
                        disabled={testCaseFields.length === 1}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Input</span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered min-h-28 w-full p-3 resize-y"
                          {...register(`testcases.${index}.input`)}
                          placeholder="Enter test case input"
                        />
                        {errors.testcases?.[index]?.input && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.testcases[index].input.message}
                            </span>
                          </label>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Expected Output
                          </span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered min-h-28 w-full p-3 resize-y"
                          {...register(`testcases.${index}.output`)}
                          placeholder="Enter expected output"
                        />
                        {errors.testcases?.[index]?.output && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.testcases[index].output.message}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.testcases && !Array.isArray(errors.testcases) && (
              <div className="mt-4">
                <span className="text-error text-sm">
                  {errors.testcases.message}
                </span>
              </div>
            )}
          </div>

          {/* Code Editor Sections */}
          <div className="space-y-8">
            {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
              <div
                key={language}
                className="card bg-base-200 p-6 rounded-lg shadow-md"
              >
                <button
                  type="button"
                  className="flex items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSection(language)}
                >
                  <h3 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-primary" />
                    {language}
                  </h3>
                  {collapsedSections[language] ? (
                    <ChevronDown className="w-6 h-6 text-base-content" />
                  ) : (
                    <ChevronUp className="w-6 h-6 text-base-content" />
                  )}
                </button>
                {!collapsedSections[language] && (
                  <div className="space-y-6 mt-6">
                    <div className="card bg-base-100 shadow-md rounded-lg">
                      <div className="card-body p-4 md:p-6">
                        <h4 className="font-semibold text-lg mb-4">
                          Starter Code Template
                        </h4>
                        <div className="border rounded-md overflow-hidden">
                          <Controller
                            name={`codeSnippets[${language}]`}
                            control={control}
                            render={({ field }) => (
                              <Editor
                                height="34rem"
                                language={language.toLowerCase()}
                                theme="vs-dark"
                                value={field.value}
                                onChange={field.onChange}
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 14,
                                  lineNumbers: "on",
                                  roundedSelection: false,
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                }}
                              />
                            )}
                          />
                        </div>
                        {errors.codeSnippets?.[language] && (
                          <div className="mt-2">
                            <span className="text-error text-sm">
                              {errors.codeSnippets[language].message}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card bg-base-100 shadow-md rounded-lg">
                      <div className="card-body p-4 md:p-6">
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                          Reference Solution
                        </h4>
                        <div className="border rounded-md overflow-hidden">
                          <Controller
                            name={`referenceSolutions[${language}]`}
                            control={control}
                            render={({ field }) => (
                              <Editor
                                height="34rem"
                                language={language.toLowerCase()}
                                theme="vs-dark"
                                value={field.value}
                                onChange={field.onChange}
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 14,
                                  lineNumbers: "on",
                                  roundedSelection: false,
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                }}
                              />
                            )}
                          />
                        </div>
                        {errors.referenceSolutions?.[language] && (
                          <div className="mt-2">
                            <span className="text-error text-sm">
                              {errors.referenceSolutions[language].message}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card bg-base-100 shadow-md rounded-lg">
                      <div className="card-body p-4 md:p-6">
                        <h4 className="font-semibold text-lg mb-4">Example</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Input
                              </span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                              {...register(`examples[${language}].input`)}
                              placeholder="Example input"
                            />
                            {errors.examples?.[language]?.input && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.examples[language].input.message}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Output
                              </span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                              {...register(`examples[${language}].output`)}
                              placeholder="Example output"
                            />
                            {errors.examples?.[language]?.output && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.examples[language].output.message}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="form-control md:col-span-2">
                            <label className="label">
                              <span className="label-text font-medium">
                                Explanation
                              </span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered min-h-28 w-full p-3 resize-y"
                              {...register(`examples[${language}].explanation`)}
                              placeholder="Explain the example"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="card bg-base-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-warning" />
              Additional Information
            </h3>
            <div className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Constraints</span>
                </label>
                <textarea
                  className="textarea textarea-bordered min-h-28 w-full p-3 resize-y"
                  {...register("constraints")}
                  placeholder="Enter problem constraints"
                />
                {errors.constraints && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.constraints.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Hints (Optional)
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered min-h-28 w-full p-3 resize-y"
                  {...register("hints")}
                  placeholder="Enter hints for solving the problem"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Editorial (Optional)
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered min-h-32 w-full p-3 resize-y"
                  {...register("editorial")}
                  placeholder="Enter problem editorial"
                />
              </div>
            </div>
          </div>

          {/* Sticky Action Bar */}
          <div className="bg-base-100 py-4 border-t border-base-300">
            <div className="card-actions justify-end">
              <button
                type="submit"
                className={`btn btn-primary btn-lg flex items-center justify-center gap-4 px-6 py-3 rounded-md transition-all duration-300 ease-in-out ${
                  isLoading
                    ? "cursor-not-allowed opacity-70"
                    : "hover:bg-blue-700"
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex gap-2 p-1">
                    <svg
                      className="animate-spin h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-label="Loading spinner"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8 v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <p>Creating...</p>
                  </div>
                ) : (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-semibold text-lg">
                      Create Problem
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProblemForm;
