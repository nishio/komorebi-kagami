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
  questions.forEach((question: { description: string }) => {
    const questionDocRef = topicDocRef.collection("questions").doc();
    batch.set(questionDocRef, { description: question.description });
  });

  // Commit the transaction
  await batch.commit();
};
