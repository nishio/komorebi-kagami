const { Pool } = require("pg");
import { Vote, VoteCount } from "./types";

export const db = new Pool({
  host: process.env.POSTGRES_HOST,
  database: "voting_system",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export async function update_vote(
  topic_id: string,
  user_id: string,
  question_id: string,
  vote_value: number
): Promise<void> {
  await db.query(
    `
      INSERT INTO Votes (topic_id, user_id, question_id, vote_value, timestamp) 
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      ON CONFLICT (topic_id, user_id, question_id) DO UPDATE 
      SET vote_value = EXCLUDED.vote_value, timestamp = EXCLUDED.timestamp;
    `,
    [topic_id, user_id, question_id, vote_value]
  );
}

export async function get_vote_counts(
  question_id: string
): Promise<VoteCount[]> {
  const res = await db.query(
    `
      SELECT vote_value, COUNT(*) AS count
      FROM Votes
      WHERE question_id = $1
      GROUP BY question_id, vote_value;
    `,
    [question_id]
  );

  return res.rows.map((row: any) => ({
    vote_value: row.vote_value,
    count: parseInt(row.count),
  }));
}

export async function getVotesByPersonForTopic(
  person: string,
  topic: string
): Promise<Vote[]> {
  const result = await db.query(
    `SELECT question_id, vote_value 
     FROM Votes 
     WHERE user_id = $1 AND topic_id = $2`,
    [person, topic]
  );

  return result.rows;
}
