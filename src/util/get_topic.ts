// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  orderBy,
  query,
  getDoc,
  writeBatch,
} from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdjev6D21GLPvTt1q80hbiR6q6qTSwkJ4",
  authDomain: "komorebi-kagami.firebaseapp.com",
  projectId: "komorebi-kagami",
  storageBucket: "komorebi-kagami.appspot.com",
  messagingSenderId: "562891149699",
  appId: "1:562891149699:web:8f87d28b93ac4a4e6b66b6",
  measurementId: "G-JYVFG6VTS3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app); // less flexible

export type Topic =
  | undefined // not found
  | {
      id: string;
      description: string;
    };

export const get_topic = async (topicId: string): Promise<Topic> => {
  // returns undefined if not found
  const topicRef = doc(db, "topics", topicId);
  const topicSnapshot = await getDoc(topicRef);
  return topicSnapshot.data() as Topic;
};

export type TQuestion = {
  id: string;
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
