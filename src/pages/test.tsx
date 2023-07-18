// filename: pages/test.tsx
import React, { useEffect, useState } from "react";
import Question from "@/components/Question";
import { call_get_votes_by_person_for_topic } from "@/util/call_api";
import { Vote } from "@/util/types";
import { TQuestion, Topic, get_questions, get_topic } from "@/util/get_topic";

// const topicId = "2aM78yxUKopAHogmVHaK";
const topicId = "75A054UDz25dl2qG2Fmw";

// const questions: Question[] = [
//   { id: "q1", description: "Question 1 Description" },
//   { id: "q2", description: "Question 2 Description" },
//   { id: "q3", description: "Question 3 Description" },
// ];
type TopicState = null | Topic; // not read yet

const TestPage: React.FC = () => {
  const [topic, setTopic] = useState(null as TopicState);
  const [questions, setQuestions] = useState([] as TQuestion[]);
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

  useEffect(() => {
    get_topic(topicId).then((topic) => {
      setTopic(topic);
    });
    get_questions(topicId).then((questions) => {
      setQuestions(questions);
    });
  }, [topicId]);

  return (
    <div>
      <h1>test_topic</h1>
      {topic && topic.description}

      {questions.map((question) => (
        <Question
          key={question.id}
          id={question.id}
          index={question.index}
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
