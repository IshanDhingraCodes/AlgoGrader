import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
  Code,
  Terminal,
  ChevronDown,
  ChevronUp,
  HardDrive,
  X,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const SubmissionsList = ({ submissions, isLoading }) => {
  const [expandedSubmission, setExpandedSubmission] = useState(null);

  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };

  const calculateAverageMemory = (memoryData) => {
    const memoryArray = safeParse(memoryData).map((m) =>
      parseFloat(m.split(" ")[0])
    );
    if (memoryArray.length === 0) return 0;
    return (
      memoryArray.reduce((acc, curr) => acc + curr, 0) / memoryArray.length
    );
  };

  const calculateAverageTime = (timeData) => {
    const timeArray = safeParse(timeData).map((t) =>
      parseFloat(t.split(" ")[0])
    );
    if (timeArray.length === 0) return 0;
    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!submissions?.length) {
    return (
      <div className="bg-base-300 rounded-lg shadow p-8 flex flex-col items-center text-center text-gray-500">
        <X size={48} className="mb-3 text-error" />
        <h2 className="text-2xl font-semibold mb-2">No submissions found</h2>
        <p className="max-w-md">
          You haven't submitted any solutions for this problem yet.
        </p>
      </div>
    );
  }

  const reversedSubmissions = [...submissions].reverse();

  return (
    <div className="space-y-4">
      {reversedSubmissions.map((submission) => {
        const avgMemory = calculateAverageMemory(submission.memory);
        const avgTime = calculateAverageTime(submission.time);

        return (
          <div
            key={submission.id}
            className="card bg-base-200 shadow-md rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
          >
            <button
              onClick={() => toggleExpand(submission.id)}
              className="w-full text-left p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer"
              aria-expanded={expandedSubmission === submission.id}
            >
              <div className="flex items-center gap-4">
                {submission.status === "Accepted" ? (
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">Accepted</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-error">
                    <XCircle className="w-5 h-5" />
                    <span className="font-semibold">{submission.status}</span>
                  </div>
                )}
                <div className="badge badge-neutral badge-sm">
                  {submission.language}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-base-content/70 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{avgTime.toFixed(3)} s</span>
                </div>
                <div className="flex items-center gap-1">
                  <Memory className="w-4 h-4" />
                  <span>{avgMemory.toFixed(0)} KB</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(submission.createdAt)}</span>
                </div>
              </div>
              <div className="text-primary self-end sm:self-center">
                {expandedSubmission === submission.id ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            {expandedSubmission === submission.id && (
              <div className="border-t border-base-300 px-6 py-5 bg-base-100">
                {/* Solution Code */}
                <section className="mb-6">
                  <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
                    <Code size={20} />
                    Solution Code
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
                          {(() => {
                            try {
                              const parsedStdout = JSON.parse(
                                submission.stdout
                              );
                              return Array.isArray(parsedStdout)
                                ? parsedStdout.join("\n")
                                : submission.stdout || "No output";
                            } catch (error) {
                              console.error(
                                "Error parsing submission stdout:",
                                error
                              );
                              return submission.stdout || "No output";
                            }
                          })()}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <div className="stats shadow rounded-lg bg-base-200">
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
                          } catch (error) {
                            // 'error' is now used here
                            console.error(
                              "Error parsing submission time:",
                              error
                            );
                            return submission.time || "N/A";
                          }
                        })()}
                      </div>
                    </div>
                  </div>

                  <div className="stats shadow rounded-lg bg-base-200">
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
                          } catch (error) {
                            console.error(
                              "Error parsing submission memory:",
                              error
                            );
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
        );
      })}
    </div>
  );
};

export default SubmissionsList;
