import React, { useState, useEffect, useCallback } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import {
  FileText,
  Lightbulb,
  Code2,
  Home,
  ChevronRight,
  Terminal,
  ThumbsUp,
  Bookmark,
  Share2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { useThemeStore } from "../store/useThemeStore";
import { getLanguageId } from "../lib/lang";
import SubmissionResults from "../components/SubmissionResults";
import SubmissionsList from "../components/SubmissionList";
import ThemeToggle from "../components/ui/ThemeToggle";
import AddToPlaylist from "../components/AddToPlaylist";
import { shareProblem } from "../lib/shareProblemUrl";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    isExecuting,
    submission,
    executeCode,
    isRunning,
    runResult,
    runcode,
    resetExecution,
  } = useExecutionStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();
  const { theme } = useThemeStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  useEffect(() => {
    resetExecution();
  }, [id, resetExecution]);

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [getProblemById, getSubmissionCountForProblem, id]);

  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippets?.[selectedLanguage] || "");
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
    async (e) => {
      if (e) e.preventDefault();
      try {
        const language_id = getLanguageId(selectedLanguage);
        const stdin = problem.testcases.map((tc) => tc.input);
        const expected_outputs = problem.testcases.map((tc) => tc.output);

        await executeCode(code, language_id, stdin, expected_outputs, id); // wait for execution
        await getSubmissionCountForProblem(id); // now update count
      } catch (error) {
        console.log("Error executing code", error);
      }
    },
    [
      code,
      selectedLanguage,
      problem,
      executeCode,
      id,
      getSubmissionCountForProblem,
    ]
  );

  const handleRunCode = useCallback(() => {
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      runcode(code, language_id, stdin, expected_outputs);
    } catch (error) {
      console.log("Error running code", error);
    }
  }, [code, selectedLanguage, problem, runcode]);

  const handleAddToPlaylist = (id) => {
    setSelectedProblemId(id);
    setIsAddToPlaylistModalOpen(true);
  };

  const handleShare = () => {
    const url = window.location.href;
    shareProblem(problem.title, url);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none dark:prose-invert space-y-5 lg:pb-20">
            <p className="text-base-content/90 text-sm md:text-base whitespace-pre-wrap">
              {problem.description}
            </p>
            {problem.examples && (
              <>
                <h3 className="text-lg md:text-xl font-bold text-base-content">
                  Examples
                </h3>
                {Object.entries(problem.examples).map(([lang, example]) => (
                  <div
                    key={lang}
                    className="bg-base-200 p-4 rounded-lg shadow-sm"
                  >
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-primary mb-2">
                        Input
                      </div>
                      <pre className="bg-black/80 text-white p-3 rounded-lg text-xs md:text-sm whitespace-pre-wrap">
                        {example.input}
                      </pre>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-primary mb-2">
                        Output
                      </div>
                      <pre className="bg-black/80 text-white p-3 rounded-lg text-xs md:text-sm whitespace-pre-wrap">
                        {example.output}
                      </pre>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-sm font-semibold text-success mb-2">
                          Explanation
                        </div>
                        <p className="text-base-content/80 text-xs md:text-sm whitespace-pre-wrap">
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
                <h3 className="text-lg md:text-xl font-bold text-base-content">
                  Constraints
                </h3>
                <div className="bg-base-200 p-4 rounded-lg shadow-sm">
                  <pre className="bg-black/80 text-white p-3 rounded-lg text-xs md:text-sm whitespace-pre-wrap">
                    {problem.constraints}
                  </pre>
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
              <div className="bg-base-200 p-4 rounded-lg shadow-sm text-base-content/80 text-sm md:text-base">
                {problem.hints}
              </div>
            ) : (
              <div className="text-center text-base-content/70 py-10">
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
      <div className="fixed inset-0 flex items-center justify-center bg-base-100/90 z-50">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  const Navbar = () => (
    <nav className="navbar bg-base-100 shadow px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      {/* Left: Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm md:text-base text-base-content/80">
        <Link to="/" className="flex items-center gap-1 hover:text-primary">
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <ChevronRight className="w-4 h-4 text-base-content/50" />
        <span className="text-base-content/60 font-medium truncate max-w-[10rem] sm:max-w-[15rem]">
          Problems
        </span>
        <ChevronRight className="w-4 h-4 text-base-content/50" />
        <span className="font-semibold text-base-content truncate max-w-[12rem] sm:max-w-[20rem]">
          {problem.title}
        </span>
      </div>

      {/* Center: Run and Submit */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={handleRunCode}
          disabled={isRunning}
          className={`btn btn-sm btn-outline btn-primary flex items-center gap-1 rounded-md ${
            isRunning ? "opacity-70" : "hover:bg-primary/70"
          }`}
        >
          {isRunning ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <Terminal className="w-4 h-4" />
          )}
          <span className="inline">Run Code</span>
        </button>

        <button
          onClick={handleSubmitCode}
          disabled={isExecuting}
          className={`btn btn-sm btn-outline btn-success flex items-center gap-1 rounded-md ${
            isExecuting ? "opacity-70" : "hover:bg-success/10"
          }`}
        >
          {isExecuting ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <ThumbsUp className="w-4 h-4" />
          )}
          <span className="inline">Submit</span>
        </button>
      </div>

      {/* Right: Language, Bookmark, Share, Theme */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        <select
          className="select select-sm select-primary w-32 text-sm"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {Object.keys(problem.codeSnippets || {}).map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <button
          className="btn btn-sm rounded-sm hover:bg-accent/70 flex items-center gap-1"
          onClick={() => handleAddToPlaylist(id)}
        >
          <Bookmark className="w-4 h-4" />
        </button>

        <button
          className="btn btn-sm rounded-sm hover:bg-accent/70 flex items-center gap-1"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
        </button>

        <ThemeToggle />
      </div>
    </nav>
  );

  return (
    <div className="flex flex-col bg-gradient-to-br from-base-200 to-base-300 min-h-screen lg:h-screen">
      <Navbar />
      <main className="flex-grow p-2">
        <div className="block lg:hidden space-y-4">
          <div className="h-[400px] bg-base-100 rounded-lg shadow-md">
            <Editor
              height="100%"
              language={selectedLanguage.toLowerCase()}
              theme={theme === "light" ? "vs" : "vs-dark"}
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                automaticLayout: true,
                fontFamily: "'Fira Code', monospace",
                scrollBeyondLastLine: false,
              }}
            />
          </div>
          <div className="bg-base-100 rounded-lg shadow-md p-4">
            {submission ? (
              <SubmissionResults submission={submission} />
            ) : runResult ? (
              <SubmissionResults submission={runResult} />
            ) : (
              <>
                <h3 className="text-lg font-bold text-base-content mb-4">
                  Test Cases
                </h3>
                <div className="overflow-x-auto border border-base-300 rounded-lg">
                  <table className="table w-full table-zebra text-sm">
                    <thead className="bg-base-200">
                      <tr>
                        <th className="p-2 text-sm">Input</th>
                        <th className="p-2 text-sm">Expected Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {problem.testcases.map((tc, index) => (
                        <tr key={index}>
                          <td className="font-mono whitespace-pre-wrap p-2 text-xs md:text-sm">
                            {tc.input}
                          </td>
                          <td className="font-mono whitespace-pre-wrap p-2 text-xs md:text-sm">
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
          <div className="bg-base-100 rounded-lg shadow-md">
            <div className="tabs p-2 border-b border-base-300">
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
                    className={`tab flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-primary/10 text-primary font-semibold"
                        : "hover:bg-base-200 text-base-content/70"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {tab === "submissions" && submissionCount > 0 && (
                      <span className="badge badge-sm badge-primary/70 ml-2 rounded-full">
                        {submissionCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="p-4">{renderTabContent()}</div>
          </div>
        </div>

        <div className="hidden lg:block h-[calc(100vh-5rem)]">
          <PanelGroup direction="horizontal">
            <Panel defaultSize={55} minSize={30} className="pr-2">
              <PanelGroup direction="vertical">
                <Panel
                  defaultSize={60}
                  minSize={20}
                  className="flex-1 bg-base-100 rounded-lg shadow-md"
                >
                  <Editor
                    height="100%"
                    language={selectedLanguage.toLowerCase()}
                    theme={theme === "light" ? "vs" : "vs-dark"}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: "on",
                      automaticLayout: true,
                      fontFamily: "'Fira Code', monospace",
                      scrollBeyondLastLine: false,
                    }}
                  />
                </Panel>

                <PanelResizeHandle className="relative h-4 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all">
                  <div className="h-1 bg-base-100 rounded-full w-full relative">
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-3 w-14 rounded-full bg-gray-500 backdrop-blur-sm border border-base-300 shadow-sm group-hover:shadow-md group-hover:bg-accent group-hover:scale-105 transition-all duration-300"></div>
                  </div>
                </PanelResizeHandle>

                <Panel
                  defaultSize={40}
                  minSize={20}
                  className="bg-base-100 rounded-lg shadow-md p-4 overflow-y-auto"
                >
                  {submission ? (
                    <SubmissionResults submission={submission} />
                  ) : runResult ? (
                    <SubmissionResults submission={runResult} />
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-base-content mb-4">
                        Test Cases
                      </h3>
                      <div className="overflow-x-auto border border-base-300 rounded-lg">
                        <table className="table w-full table-zebra text-sm">
                          <thead className="bg-base-200">
                            <tr>
                              <th className="p-2 text-sm">Input</th>
                              <th className="p-2 text-sm">Expected Output</th>
                            </tr>
                          </thead>
                          <tbody>
                            {problem.testcases.map((tc, index) => (
                              <tr key={index}>
                                <td className="font-mono whitespace-pre-wrap p-2 text-xs md:text-sm">
                                  {tc.input}
                                </td>
                                <td className="font-mono whitespace-pre-wrap p-2 text-xs md:text-sm">
                                  {tc.output}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </Panel>
              </PanelGroup>
            </Panel>
            <PanelResizeHandle className="relative w-4 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all">
              <div className="w-1 bg-base-100 rounded-full h-full relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3 h-14 rounded-full bg-gray-500 backdrop-blur-sm border border-base-300 shadow-sm group-hover:shadow-md group-hover:bg-accent group-hover:scale-105 transition-all duration-300"></div>
              </div>
            </PanelResizeHandle>
            <Panel className="bg-base-100 rounded-lg shadow-md overflow-y-auto">
              <div className="tabs p-2 border-b border-base-300">
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
                      className={`tab flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeTab === tab
                          ? "bg-accent text-accent-content font-semibold"
                          : "hover:bg-accent text-accent-content"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {tab === "submissions" && submissionCount > 0 && (
                        <span className="badge badge-sm badge-primary/70 ml-2 rounded-full">
                          {submissionCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="p-4 overflow-y-auto h-full">
                {renderTabContent()}
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </main>
      <AddToPlaylist
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemPage;
