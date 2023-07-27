// filename: pages/test.tsx
import React, { useEffect, useState } from "react";
import Question from "@/components/Question";
import { call_get_votes_by_person_for_topic } from "@/util/call_api";
import { Vote } from "@/util/types";
import { TQuestion, Topic, get_questions, get_topic } from "@/util/get_topic";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

type TopicState = null | Topic; // not read yet

const Page: React.FC = () => {
  const [topic, setTopic] = useState(null as TopicState);
  const [questions, setQuestions] = useState([] as TQuestion[]);
  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [topicId, setTopicId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    console.log("auth", auth);
    signInAnonymously(auth);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!router.isReady) return; // wait topinId
    if (userId === null) return; // wait userId

    const { id } = router.query;
    const topicId = Array.isArray(id) ? id[0]! : id!;
    setTopicId(topicId);

    async function handle() {
      const votes = await call_get_votes_by_person_for_topic(userId!, topicId);
      const v = {} as { [key: string]: number };
      votes.forEach((vote: Vote) => {
        v[vote.question_id] = vote.vote_value;
      });
      setVotes(v);
    }
    handle();

    get_topic(topicId).then((topic) => {
      setTopic(topic);
    });
    get_questions(topicId).then((questions) => {
      setQuestions(questions);
    });
  }, [router.isReady, router.query, userId]);

  const QuestionList =
    topicId !== null && userId !== null
      ? questions.map((question) => (
          <Question
            key={question.id}
            id={question.id}
            index={question.index}
            description={question.description}
            topicId={topicId}
            userId={userId}
            vote={votes[question.id]}
          />
        ))
      : null;

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{topic && topic.title}</h1>
      {/* UserID: {userId} */}
      {topic && topic.description}
      {QuestionList}
    </div>
  );
};

export default Page;
