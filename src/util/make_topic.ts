import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "./client_firebase";

export async function make_topic(
  title: string,
  description: string,
  questions: string[]
) {
  const topicsCollection = collection(db, "topics");
  const topicDoc = doc(topicsCollection);
  console.log({ topicDoc });
  await setDoc(topicDoc, {
    title,
    description,
  });

  const questionsCollection = collection(topicDoc, "questions");
  for (const [index, description] of questions.entries()) {
    const question = { index, description };
    await addDoc(questionsCollection, question);
  }
  console.log({ topicDoc });

  return topicDoc.id;
}
