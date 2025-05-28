import React, { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import {
  FileText,
  Lightbulb,
  Code2,
  Home,
  ChevronRight,
  Terminal,
  ThumbsUp,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { getLanguageId } from "../lib/lang";
import SubmissionResults from "../components/Submission";
import SubmissionsList from "../components/SubmissionList";
import ThemeToggle from "../components/ui/themeToggle";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const { isExecuting, submission, executeCode } = useExecutionStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [testcases, setTestCases] = useState([]);

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [getProblemById, getSubmissionCountForProblem, id]);

  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippets?.[selectedLanguage] || "");
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, getSubmissionForProblem, id]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  };

  const handleSubmitCode = useCallback(
    (e) => {
      if (e) e.preventDefault();
      try {
        const language_id = getLanguageId(selectedLanguage);
        const stdin = problem.testcases.map((tc) => tc.input);
        const expected_outputs = problem.testcases.map((tc) => tc.output);
        executeCode(code, language_id, stdin, expected_outputs, id);
      } catch (error) {
        console.log("Error executing code", error);
      }
    },
    [code, selectedLanguage, problem, executeCode, id]
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-lg mb-6 whitespace-pre-wrap">
              {problem.description}
            </p>

            {problem.examples && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {Object.entries(problem.examples).map(([lang, example]) => (
                  <div
                    key={lang}
                    className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
                    tabIndex={0}
                  >
                    <div className="mb-4">
                      <div className="text-indigo-300 mb-2 font-semibold">
                        Input:
                      </div>
                      <span className="bg-black/90 px-4 py-1 rounded-lg text-white whitespace-pre-wrap">
                        {example.input}
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="text-indigo-300 mb-2 font-semibold">
                        Output:
                      </div>
                      <span className="bg-black/90 px-4 py-1 rounded-lg text-white whitespace-pre-wrap">
                        {example.output}
                      </span>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-emerald-300 mb-2 font-semibold">
                          Explanation:
                        </div>
                        <p className="text-base-content/70 whitespace-pre-wrap">
                          {example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {problem.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className="bg-base-200 p-6 rounded-xl whitespace-pre-wrap">
                  <span className="bg-black/90 px-4 py-1 rounded-lg text-white text-lg">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl whitespace-pre-wrap">
                {problem.hints}
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100/80 z-50">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-200 w-full mx-auto">
      {/* Navbar */}
      <nav className="navbar bg-base-100 shadow-md px-6 py-3 flex flex-wrap justify-between items-center gap-4 sticky top-0 z-10">
        <div className="flex items-center gap-2 text-primary text-sm md:text-base truncate">
          <Link to="/" className="flex items-center gap-1">
            <Home className="w-6 h-6" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-base-content/50" />
          <span className="font-semibold text-base-content/70">Problems</span>
          <ChevronRight className="w-4 h-4 text-base-content/50" />
          <span className="font-bold text-base-content truncate max-w-xs">
            {problem.title}
          </span>
        </div>

        <button
          className={`btn btn-success btn-sm md:btn-md gap-2 rounded-sm ${
            isExecuting ? "loading" : ""
          }`}
          onClick={handleSubmitCode}
          disabled={isExecuting}
          aria-label="Submit code"
        >
          {!isExecuting && <ThumbsUp className="w-4 h-4" />}
          Submit
        </button>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <ThemeToggle />
          <select
            className="select select-bordered select-primary w-36"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(problem.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="card bg-base-100 shadow-lg rounded-lg">
            <div className="tabs tabs-bordered flex gap-1">
              {["description", "submissions", "hints"].map((tab) => {
                const icons = {
                  description: FileText,
                  submissions: Code2,
                  hints: Lightbulb,
                };
                const Icon = icons[tab];
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    className={`tab flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      activeTab === tab
                        ? "tab-active bg-primary text-primary-content"
                        : "hover:bg-base-200"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {tab === "submissions" && submissionCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center px-2 text-xs font-semibold bg-base-200 rounded-full">
                        {submissionCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-6 overflow-y-auto max-h-[800px]">
              {renderTabContent()}
            </div>
          </div>

          {/* Right Section: Editor & Results */}
          <div className="flex flex-col gap-6">
            <div className="card bg-base-100 shadow-lg rounded-lg h-[600px]">
              <div className="tabs tabs-bordered">
                <button className="tab tab-active flex items-center gap-2 px-6 py-3">
                  <Terminal className="w-5 h-5" />
                  Code Editor
                </button>
              </div>
              <Editor
                height="100%"
                language={selectedLanguage.toLowerCase()}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  lineNumbers: "on",
                  automaticLayout: true,
                  fontFamily: "'Fira Code', monospace",
                }}
              />
            </div>

            <div className="card bg-base-100 shadow-lg rounded-lg overflow-hidden">
              <div className="card-body p-6">
                {submission ? (
                  <SubmissionResults submission={submission} />
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-4">Test Cases</h3>
                    <div className="overflow-x-auto border border-base-300 rounded-lg">
                      <table className="table w-full table-zebra">
                        <thead className="bg-base-200">
                          <tr>
                            <th>Input</th>
                            <th>Expected Output</th>
                          </tr>
                        </thead>
                        <tbody>
                          {testcases.map((tc, index) => (
                            <tr key={index}>
                              <td className="font-mono whitespace-pre-wrap">
                                {tc.input}
                              </td>
                              <td className="font-mono whitespace-pre-wrap">
                                {tc.output}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
