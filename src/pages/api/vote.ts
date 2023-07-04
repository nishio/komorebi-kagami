// filename: pages/api/votes.ts
import { NextApiRequest, NextApiResponse } from "next";
import { update_vote } from "../../util/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("vote", req.method, req.body);
  if (req.method === "POST") {
    const { topicId, userId, questionId, voteValue } = req.body;
    await update_vote(topicId, userId, questionId, voteValue);
    res.status(200).json({ status: "updated" });
  }
}
