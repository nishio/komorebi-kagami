// filename: pages/api/votes.ts
import { NextApiRequest, NextApiResponse } from "next";
import { get_vote_counts } from "../../util/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("get_vote_counts", req.method, req.query);
  if (req.method === "GET") {
    const { questionId } = req.query;
    const counts = await get_vote_counts(questionId as string);
    res.status(200).json(counts);
  }
}
