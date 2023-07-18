// filename: components/Question.tsx
import React, { useEffect, useState } from "react";
//import { update_vote, get_vote_counts, VoteCount } from "../util/util";
import { VoteCount } from "@/util/types";
import { call_update_vote, call_get_vote_counts } from "../util/call_api";
import StackedBarChart from "./BarChart";

type Props = {
  id: string;
  index: number;
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
  index,
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

  const VoteButton: React.FC<{ voteValue: number }> = ({ voteValue }) => {
    // @ts-ignore
    const label = button_labels[voteValue.toString()];
    return (
      <button
        onClick={() => handleVote(voteValue)}
        style={{ borderColor: voteValue === voted ? "blue" : "lightgray" }}
      >
        {label}
      </button>
    );
  };

  return (
    <div>
      <h2>
        Q{index + 1}: {description}
      </h2>
      <VoteButton voteValue={1} />
      <VoteButton voteValue={0} />
      <VoteButton voteValue={-1} />

      {/* <p>{voted !== undefined ? `voted: ${voted}` : "not voted"}</p> */}
      {voted !== undefined && <StackedBarChart data={voteCounts} />}
    </div>
  );
};

export default Question;
