// filename: pages/api/votes.ts
import { NextApiRequest, NextApiResponse } from "next";
import { get_vote_counts } from "../../util/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("get_vote_counts", req.method, req.query);
  if (req.method === "GET") {
    const { question } = req.query;
    const counts = await get_vote_counts(question as string);
    res.status(200).json(counts);
  }
}
