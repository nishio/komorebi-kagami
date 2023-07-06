// filename: components/BarChart.tsx
import { VoteCount } from "@/util/types";
import React from "react";

type Props = {
  data: VoteCount[];
};

const StackedBarChart: React.FC<Props> = ({ data }) => {
  let positive = 1,
    neutral = 1,
    negative = 1;
  data.forEach((d) => {
    if (d.vote_value === 1) positive = d.count + 1;
    if (d.vote_value === 0) neutral = d.count + 1;
    if (d.vote_value === -1) negative = d.count + 1;
  });

  const total = positive + neutral + negative;
  const positivePercentage = (positive / total) * 100;
  const neutralPercentage = (neutral / total) * 100;
  const negativePercentage = (negative / total) * 100;

  return (
    <div style={{ display: "flex", height: "20px", width: "100%" }}>
      <div
        style={{ width: `${positivePercentage}%`, backgroundColor: "green" }}
      />
      <div
        style={{ width: `${neutralPercentage}%`, backgroundColor: "lightgrey" }}
      />
      <div
        style={{ width: `${negativePercentage}%`, backgroundColor: "red" }}
      />
    </div>
  );
};

export default StackedBarChart;
