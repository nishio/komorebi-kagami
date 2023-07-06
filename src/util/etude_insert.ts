import { db } from "./db";

export const insertVote = async (
  topic_id: string,
  user_id: string,
  question_id: string,
  vote_value: number
) => {
  console.log("inserting vote", topic_id, user_id, question_id, vote_value);
  const queryText =
    "INSERT INTO Votes (topic_id, user_id, question_id, vote_value, timestamp) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)";
  const params = [topic_id, user_id, question_id, vote_value];

  try {
    const res = await db.query(queryText, params);
    console.log(res.rows[0]);
  } catch (err) {
    console.error(err);
  }
};
