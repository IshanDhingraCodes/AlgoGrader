import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from "lucide-react";

const SubmissionResults = ({ submission }) => {
  const memoryArr = JSON.parse(submission.memory || "[]");
  const timeArr = JSON.parse(submission.time || "[]");
  const avgMemory =
    memoryArr.map((m) => parseFloat(m)).reduce((a, b) => a + b, 0) /
      memoryArr.length || 0;
  const avgTime =
    timeArr.map((t) => parseFloat(t)).reduce((a, b) => a + b, 0) /
      timeArr.length || 0;
  const passedTests = submission.testCases.filter((tc) => tc.passed).length;
  const totalTests = submission.testCases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="space-y-4 animate-slide-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card bg-base-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
          <h3 className="text-xs font-semibold text-base-content/70">Status</h3>
          <div
            className={`text-base font-bold ${
              submission.status === "Accepted" ? "text-success" : "text-error"
            }`}
          >
            {submission.status}
          </div>
        </div>
        <div className="card bg-base-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
          <h3 className="text-xs font-semibold text-base-content/70">
            Success Rate
          </h3>
          <div className="text-base font-bold">{successRate.toFixed(1)}%</div>
        </div>
        <div className="card bg-base-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
          <h3 className="text-xs font-semibold flex items-center gap-2 text-base-content/70">
            <Clock className="w-4 h-4" />
            Avg. Runtime
          </h3>
          <div className="text-base font-bold">{avgTime.toFixed(3)} s</div>
        </div>
        <div className="card bg-base-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
          <h3 className="text-xs font-semibold flex items-center gap-2 text-base-content/70">
            <Memory className="w-4 h-4" />
            Avg. Memory
          </h3>
          <div className="text-base font-bold">{avgMemory.toFixed(0)} KB</div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-md rounded-lg p-4">
        <h2 className="text-lg font-bold text-base-content mb-4">
          Test Cases Results
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra text-sm">
            <thead className="bg-base-200">
              <tr>
                <th className="text-sm">Status</th>
                <th className="text-sm">Expected Output</th>
                <th className="text-sm">Your Output</th>
                <th className="text-sm">Memory</th>
                <th className="text-sm">Time</th>
              </tr>
            </thead>
            <tbody>
              {submission.testCases.map((testCase) => (
                <tr key={testCase.id}>
                  <td>
                    {testCase.passed ? (
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle2 className="w-4 h-4" />
                        Passed
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-error">
                        <XCircle className="w-4 h-4" />
                        Failed
                      </div>
                    )}
                  </td>
                  <td className="font-mono text-xs">{testCase.expected}</td>
                  <td className="font-mono text-xs">
                    {testCase.stdout || "null"}
                  </td>
                  <td className="text-xs">{testCase.memory}</td>
                  <td className="text-xs">{testCase.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmissionResults;
