import React from "react";
import { Calendar } from "lucide-react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const ContributionGraph = ({ startDate, endDate, heatmapData }) => {
  return (
    <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Contribution Graph
        </h3>
      </div>
      <div>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={heatmapData}
          classForValue={(value) => {
            if (!value || value.count === 0) return "color-empty";
            if (value.count === 1) return "color-github-1";
            if (value.count === 2) return "color-github-2";
            if (value.count <= 4) return "color-github-3";
            if (value.count <= 7) return "color-github-4";
            return "color-github-5";
          }}
          titleForValue={(value) => {
            if (!value || value.count === 0) {
              return `No submissions on ${value?.date || 'this day'}`;
            }
            return `${value.count} submission${value.count === 1 ? '' : 's'} on ${value.date}`;
          }}
          showWeekdayLabels={true}
        />
        <style>{`
          .color-empty { fill: #ebedf0; }
          .color-github-1 { fill: #9be9a8; }
          .color-github-2 { fill: #40c463; }
          .color-github-3 { fill: #30a14e; }
          .color-github-4 { fill: #216e39; }
          .color-github-5 { fill: #00441b; }
          .react-calendar-heatmap text {
            font-size: 8px;
            text-anchor: start;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ContributionGraph; 