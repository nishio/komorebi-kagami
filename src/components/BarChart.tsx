// filename: components/BarChart.tsx
import { VoteCount } from "@/util/types";
import React from "react";
import { button_labels } from "./Question";

type Props = {
  data: VoteCount[];
};

const midpointLabel = "中央値";
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

  let midpoint = "";
  if (positivePercentage > 50) {
    midpoint = button_labels["1"];
  } else if (positivePercentage + neutralPercentage >= 50) {
    midpoint = button_labels["0"];
  } else {
    midpoint = button_labels["-1"];
  }
  return (
    <>
      <div>
        {midpointLabel}: {midpoint}
        <span style={{ whiteSpace: "nowrap" }}>
          (N={total}, {positive}/{neutral}/{negative})
        </span>
      </div>
      <div
        style={{
          display: "flex",
          height: "20px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div
          style={{ width: `${positivePercentage}%`, backgroundColor: "green" }}
        />
        <div
          style={{
            width: `${neutralPercentage}%`,
            backgroundColor: "lightgrey",
          }}
        />
        <div
          style={{ width: `${negativePercentage}%`, backgroundColor: "red" }}
        />
      </div>
    </>
  );
};

export default StackedBarChart;
