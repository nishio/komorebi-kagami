import {
  doc,
  collection,
  getDocs,
  orderBy,
  query,
  getDoc,
} from "firebase/firestore";
import { db } from "./client_firebase";

export type Topic =
  | undefined // not found
  | {
      id: string;
      description: string;
      title: string;
    };

export const get_topic = async (topicId: string): Promise<Topic> => {
  // returns undefined if not found
  const topicRef = doc(db, "topics", topicId);
  const topicSnapshot = await getDoc(topicRef);
  return topicSnapshot.data() as Topic;
};

export type TQuestion = {
  id: string;
  index: number;
  description: string;
};

export const get_questions = async (topicId: string): Promise<TQuestion[]> => {
  const topicRef = doc(db, "topics", topicId);
  const questionsQuery = query(
    collection(topicRef, "questions"),
    orderBy("index")
  );
  const questionsSnapshot = await getDocs(questionsQuery);

  const questionList = questionsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return questionList as TQuestion[];
};
