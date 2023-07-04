// filename: pages/test.tsx
import React, { useEffect, useState } from "react";
import Question from "@/components/Question";
import { call_get_votes_by_person_for_topic } from "@/util/call_api";
import { Vote } from "@/util/types";

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
  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [userId] = useState("user123");
  useEffect(() => {
    async function handle() {
      const votes = await call_get_votes_by_person_for_topic(userId, topicId);
      const v = {} as { [key: string]: number };
      votes.forEach((vote: Vote) => {
        v[vote.question_id] = vote.vote_value;
      });
      setVotes(v);
    }
    handle();
  }, [userId]);
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
          vote={votes[question.id]}
        />
      ))}
    </div>
  );
};

export default TestPage;
