import { NextApiRequest, NextApiResponse } from "next";
import { getVotesByPersonForTopic } from "../../util/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { person, topic } = req.query;

  try {
    const votes = await getVotesByPersonForTopic(
      person as string,
      topic as string
    );
    res.status(200).json(votes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
