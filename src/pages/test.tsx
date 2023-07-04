// filename: pages/test.tsx
import React, { useState } from "react";
import Question from "@/components/Question";

const topicId = "test_topic";

type Question = {
  id: string;
  description: string;
};

const questions: Question[] = [
  { id: "q1", description: "Question 1 Description" },
  { id: "q2", description: "Question 2 Description" },
  { id: "q3", description: "Question 3 Description" },
];

const TestPage: React.FC = () => {
  const [userId] = useState("user123");
  return (
    <div>
      <h1>test_topic</h1>
      {"Topic Description"}
      {questions.map((question) => (
        <Question
          key={question.id}
          id={question.id}
          description={question.description}
          topicId={topicId}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default TestPage;
