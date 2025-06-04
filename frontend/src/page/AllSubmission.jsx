import React, { useEffect, useState } from "react";
import { useSubmissionStore } from "../store/useSubmissionStore";
import {
  Code,
  Terminal,
  Clock,
  HardDrive,
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const AllSubmission = () => {
  const { submissions, getAllSubmissions } = useSubmissionStore();
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getAllSubmissions();
  }, [getAllSubmissions]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-success text-success-content";
      case "Wrong Answer":
        return "bg-error text-error-content";
      case "Time Limit Exceeded":
        return "bg-warning text-warning-content";
      default:
        return "bg-info text-info-content";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const toggleExpand = (id) => {
    setExpandedSubmission(expandedSubmission === id ? null : id);
  };

  const filteredSubmissions = submissions.filter((submission) => {
    if (filter === "all") return true;
    return submission.status === filter;
  });

  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <header className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h1 className="text-4xl font-bold text-primary text-start w-full md:w-auto">
          My Submissions
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Filter Dropdown */}
          <div className="dropdown dropdown-end w-full sm:w-auto">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline w-full sm:w-auto flex items-center gap-2 justify-center"
            >
              <Filter size={18} />
              <span className="capitalize">
                {filter === "all" ? "All Submissions" : filter}
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full sm:w-52"
            >
              <li>
                <button onClick={() => setFilter("all")}>
                  All Submissions
                </button>
              </li>
              <li>
                <button onClick={() => setFilter("Accepted")}>Accepted</button>
              </li>
              <li>
                <button onClick={() => setFilter("Wrong Answer")}>
                  Wrong Answer
                </button>
              </li>
              <li>
                <button onClick={() => setFilter("Time Limit Exceeded")}>
                  Time Limit Exceeded
                </button>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div className="stats shadow bg-base-300 rounded-lg w-full sm:w-auto justify-center">
            <div className="stat p-3 w-[90px] flex flex-col items-center justify-center">
              <div className="stat-title text-xs">Total</div>
              <div className="stat-value text-xl">{submissions.length}</div>
            </div>
            <div className="stat p-3 w-[90px] flex flex-col items-center justify-center">
              <div className="stat-title text-xs">Accepted</div>
              <div className="stat-value text-xl text-success">
                {submissions.filter((s) => s.status === "Accepted").length}
              </div>
            </div>
          </div>
        </div>
      </header>

      {filteredSubmissions.length === 0 ? (
        <div className="bg-base-300 rounded-lg shadow p-8 flex flex-col items-center text-center text-gray-500">
          <X size={48} className="mb-3 text-error" />
          <h2 className="text-2xl font-semibold mb-2">No submissions found</h2>
          <p className="max-w-md">
            You haven't submitted any solutions yet, or none match your current
            filter.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-base-300 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
            >
              <button
                onClick={() => toggleExpand(submission.id)}
                className="w-full text-left p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer"
                aria-expanded={expandedSubmission === submission.id}
              >
                <div className="flex flex-wrap items-center gap-4 flex-1">
                  <span
                    className={`badge badge-lg rounded-md ${getStatusClass(
                      submission.status
                    )} whitespace-nowrap`}
                  >
                    {submission.status === "Accepted" && (
                      <Check size={16} className="inline mr-1" />
                    )}
                    {submission.status}
                  </span>

                  <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
                    <Code size={18} />
                    <span>{submission.language}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
                    <Clock size={18} />
                    <span>Submitted {formatDate(submission.createdAt)}</span>
                  </div>
                </div>

                <div className="text-primary">
                  {expandedSubmission === submission.id ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </div>
              </button>

              {expandedSubmission === submission.id && (
                <div className="border-t border-base-400 px-6 py-5 bg-base-200">
                  {/* Solution Code */}
                  <section className="mb-6">
                    <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
                      <Code size={20} />
                    </h3>
                    <div className="bg-neutral text-neutral-content p-4 overflow-x-auto rounded-lg max-h-[300px]">
                      <SyntaxHighlighter
                        language={submission.language?.toLowerCase()}
                        style={vscDarkPlus}
                        customStyle={{ background: "transparent", margin: 0 }}
                        wrapLongLines
                      >
                        {submission.sourceCode}
                      </SyntaxHighlighter>
                    </div>
                  </section>

                  {/* Input and Output */}
                  <div className="p-4 border-t border-base-300 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex flex-col ">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Terminal size={18} />
                        Input
                      </h3>
                      <div className="mockup-code bg-neutral text-neutral-content flex-grow overflow-auto rounded-2xl">
                        <pre className="p-4 min-h-[100px]">
                          <code className="flex -mt-5">
                            {Array.isArray(submission.stdin?.split?.("\n"))
                              ? submission.stdin.split("\n").join("\n")
                              : submission.stdin || "No input provided"}
                          </code>
                        </pre>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Terminal size={18} />
                        Output
                      </h3>
                      <div className="mockup-code bg-neutral text-neutral-content flex-grow overflow-auto rounded-2xl">
                        <pre className="p-4 min-h-[100px]">
                          <code className="flex -mt-5">
                            {Array.isArray(JSON.parse(submission.stdout))
                              ? JSON.parse(submission.stdout).join("\n")
                              : submission.stdout || "No output"}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="stats shadow rounded-lg bg-base-100">
                      <div className="stat p-4">
                        <div className="stat-figure text-primary">
                          <Clock size={28} />
                        </div>
                        <div className="stat-title">Execution Time</div>
                        <div className="stat-value text-lg">
                          {(() => {
                            try {
                              const time = JSON.parse(submission.time);
                              return Array.isArray(time)
                                ? time[0]
                                : submission.time || "N/A";
                            } catch {
                              return submission.time || "N/A";
                            }
                          })()}
                        </div>
                      </div>
                    </div>

                    <div className="stats shadow rounded-lg bg-base-100">
                      <div className="stat p-4">
                        <div className="stat-figure text-primary">
                          <HardDrive size={28} />
                        </div>
                        <div className="stat-title">Memory Used</div>
                        <div className="stat-value text-lg">
                          {(() => {
                            try {
                              const mem = JSON.parse(submission.memory);
                              return Array.isArray(mem)
                                ? mem[0]
                                : submission.memory || "N/A";
                            } catch {
                              return submission.memory || "N/A";
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSubmission;
