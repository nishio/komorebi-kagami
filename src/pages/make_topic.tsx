import React from "react";
import TopicForm from "../components/TopicForm";
import { make_topic } from "@/util/make_topic";
import { useRouter } from "next/router";

export function splitMultilineText(text: string): string[] {
  return text.split("\n").filter((line) => line.trim() !== "");
}

const MakeTopicPage: React.FC = () => {
  const router = useRouter();

  const onSubmit = async (
    title: string,
    description: string,
    questions: string
  ) => {
    const question_items = splitMultilineText(questions);
    console.log(title, description, question_items);
    const id = await make_topic(title, description, question_items);
    console.log({ id });
    router.push(`/topic/${id}`);
  };

  return (
    <div>
      <h1>Create a New Topic</h1>
      <TopicForm onSubmit={onSubmit} />
    </div>
  );
};

export default MakeTopicPage;
