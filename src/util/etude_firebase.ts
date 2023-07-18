import { firestore as db } from "./fb";

export const make_firestore_items = async () => {
  const topic = {
    description: "FOO(Topic Description)",
  };
  const questions = [
    { description: "FOO(Question 1)" },
    { description: "FOO(Question 2)" },
    { description: "FOO(Question 3)" },
  ];
  // Create a new topic document
  const topicDocRef = db.collection("topics").doc();

  // Begin a new transaction
  const batch = db.batch();

  // Set the new topic document
  batch.set(topicDocRef, { description: topic.description });

  // Add all questions to the topic

  questions.forEach((question: { description: string }, index: number) => {
    const questionDocRef = topicDocRef.collection("questions").doc();
    batch.set(questionDocRef, {
      description: question.description,
      index: index,
    });
  });

  // Commit the transaction
  await batch.commit();
};

const data = `
NHKはゼレンスキー大統領の会見を打ち切り、大河ドラマを放送した
「NHKは大統領演説のほぼ全文を放送した」が、「全文を放送した」ではない
「大河ドラマのために打ち切った」は「意図」であり、第三者が検証可能な客観的事実ではない。ファクトチェックの対象とすべきではない。
ある報道機関に対するファクトチェックをその報道機関に所属した経験のある人がやるのは不適切である
このファクトチェックは一元的なtrue/falseに落とし込むやり方に問題があった
すくなくとも日本では、「ファクトチェック」という語彙は左派的な色彩を帯びている。
「出鱈目にもほどがある」という表現は、意見を強調しすぎて冷静な議論をできなくしている
なにかを断言することはファクトチェックの精神に反する`;
const questions = data.split(/\n/g).filter((x) => x !== "");
export const make_topic = async (description: string): Promise<string> => {
  // Create a new topic document
  const topicDocRef = db.collection("topics").doc();

  // Begin a new transaction
  const batch = db.batch();

  // Set the new topic document
  batch.set(topicDocRef, { description: description });

  // Add all questions to the topic
  questions.forEach((question: string, index: number) => {
    const questionDocRef = topicDocRef.collection("questions").doc();
    batch.set(questionDocRef, {
      description: question,
      index,
    });
  });

  // Commit the transaction
  await batch.commit();

  return "ok";
};
