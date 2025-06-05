import React from "react";
import { Trophy } from "lucide-react";

const ProblemTags = ({ skillDistribution }) => {
  return (
    <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        Problem Tags
      </h3>
      <p className="text-sm text-base-content/70 mb-4">
        Tags from problems you've solved, showing your areas of expertise
      </p>
      <div className="flex flex-wrap gap-2">
        {skillDistribution.map(([tag, count]) => (
          <div
            key={tag}
            className="badge badge-primary gap-2 p-4 hover:scale-105 transition-transform cursor-default"
            title={`Solved ${count} problems with this tag`}
          >
            {tag}
            <span className="text-xs opacity-75">({count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemTags; 