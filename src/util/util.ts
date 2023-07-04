import { VoteCount } from "./types";
import { db } from "./db";

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
