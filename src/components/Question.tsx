// filename: components/Question.tsx
import React, { useEffect, useState } from "react";
//import { update_vote, get_vote_counts, VoteCount } from "../util/util";
import { VoteCount } from "@/util/types";
import { call_update_vote, call_get_vote_counts } from "../util/call_api";

type Props = {
  id: string;
  description: string;
  topicId: string;
  userId: string;
  vote: number | undefined;
};

const button_labels = {
  "-1": "いいえ",
  "0": "どちらでもない/わからない",
  "1": "はい",
};

const Question: React.FC<Props> = ({
  id,
  description,
  topicId,
  userId,
  vote,
}) => {
  const [voteCounts, setVoteCounts] = useState<VoteCount[]>([]);
  const [voted, setVoted] = useState(vote);

  useEffect(() => {
    setVoted(vote);
  }, [vote]);

  useEffect(() => {
    async function fetchVotes() {
      const counts = await call_get_vote_counts(id);
      setVoteCounts(counts);
      console.log(counts);
    }
    fetchVotes();
  }, [id]);

  const handleVote = async (voteValue: number) => {
    setVoted(voteValue);
    await call_update_vote(topicId, userId, id, voteValue);
    const updatedCounts = await call_get_vote_counts(id);
    setVoteCounts(updatedCounts);
  };

  return (
    <div>
      <h2>{description}</h2>
      <button onClick={() => handleVote(1)}>{button_labels["1"]}</button>
      <button onClick={() => handleVote(0)}>{button_labels["0"]}</button>
      <button onClick={() => handleVote(-1)}>{button_labels["-1"]}</button>
      <p>{voted !== undefined ? `voted: ${voted}` : "not voted"}</p>

      <div>
        Vote Counts:
        <ul>
          {voteCounts
            .filter((vc) => vc.vote_value === -1)
            .map((vc) => (
              <li key="-1">-1: {vc.count}</li>
            ))}
          {voteCounts
            .filter((vc) => vc.vote_value === 0)
            .map((vc) => (
              <li key="0">0: {vc.count}</li>
            ))}
          {voteCounts
            .filter((vc) => vc.vote_value === 1)
            .map((vc) => (
              <li key="1">1: {vc.count}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Question;
