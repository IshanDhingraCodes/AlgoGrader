import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useProblemStore } from "../store/useProblemStore";
import { problemSchema } from "../schema/problem.validation";

const defaultFormValues = {
  title: "",
  description: "",
  difficulty: "EASY",
  tags: [""],
  constraints: "",
  hints: "",
  editorial: "",
  testcases: [{ input: "", output: "" }],
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

const UpdateProblem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    problem,
    isProblemLoading,
    getProblemById,
    updateProblem,
    isUpdatingProblem,
  } = useProblemStore();
  const [collapsedSections, setCollapsedSections] = useState({
    JAVASCRIPT: true,
    PYTHON: true,
    JAVA: true,
  });

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

  // Toggle collapsible sections
  const toggleSection = (language) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [language]: !prev[language],
    }));
  };

  // Load problem data into the form
  useEffect(() => {
    getProblemById(id);
  }, [id, getProblemById]);

  useEffect(() => {
    if (problem) {
      const tags = Array.isArray(problem.tags) ? problem.tags : [""];
      const testcases =
        Array.isArray(problem.testcases) && problem.testcases.length > 0
          ? problem.testcases
          : [{ input: "", output: "" }];

      replaceTags(tags);
      replaceTestCases(testcases);

      reset({
        title: problem.title || "",
        description: problem.description || "",
        difficulty: problem.difficulty || "EASY",
        tags: tags,
        constraints: problem.constraints || "",
        hints: problem.hints || "",
        editorial: problem.editorial || "",
        testcases: testcases,
        examples: problem.examples || defaultFormValues.examples,
        codeSnippets: problem.codeSnippets || defaultFormValues.codeSnippets,
        referenceSolutions:
          problem.referenceSolutions || defaultFormValues.referenceSolutions,
      });
    }
  }, [problem, reset, replaceTags, replaceTestCases]);

  const onSubmit = async (data) => {
    try {
      await updateProblem(id, data);
      navigate("/problems");
    } catch (error) {
      console.error("Error updating problem:", error);
    }
  };

  if (isProblemLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-8 w-8 text-primary"
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
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <div className="card">
        <div className="card-body p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-base-300">
            <h2 className="card-title text-2xl md:text-3xl font-bold flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              Update Problem
            </h2>
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
                    <span className="label-text text-lg font-medium">
                      Title
                    </span>
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
                            <span className="label-text font-medium">
                              Input
                            </span>
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
                    className="flex items-center justify-between w-full"
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
                      {/* Starter Code */}
                      <div className="card bg-base-100 shadow-md rounded-lg">
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-lg mb-4">
                            Starter Code Template
                          </h4>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`codeSnippets.${language}`}
                              control={control}
                              render={({ field }) => (
                                <Editor
                                  height="300px"
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

                      {/* Reference Solution */}
                      <div className="card bg-base-100 shadow-md rounded-lg">
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                            Reference Solution
                          </h4>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`referenceSolutions.${language}`}
                              control={control}
                              render={({ field }) => (
                                <Editor
                                  height="300px"
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

                      {/* Examples */}
                      <div className="card bg-base-100 shadow-md rounded-lg">
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-lg mb-4">
                            Example
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Input
                                </span>
                              </label>
                              <textarea
                                className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                                {...register(`examples.${language}.input`)}
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
                                {...register(`examples.${language}.output`)}
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
                                {...register(
                                  `examples.${language}.explanation`
                                )}
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
                    placeholder="Enter problem editorial/solution explanation"
                  />
                </div>
              </div>
            </div>

            <div className="bg-base-100 py-4 border-t border-base-300 mt-8">
              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className={`btn btn-primary btn-lg flex items-center justify-center gap-3 px-6 py-3 rounded-md transition-all duration-300 ease-in-out ${
                    isUpdatingProblem
                      ? "cursor-not-allowed opacity-70"
                      : "hover:bg-primary-dark"
                  }`}
                  disabled={isUpdatingProblem}
                >
                  {isUpdatingProblem ? (
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
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <p>Updating...</p>
                    </div>
                  ) : (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="font-semibold text-lg">
                        Update Problem
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProblem;
