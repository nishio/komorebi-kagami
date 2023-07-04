// filename: util/call_api.ts
export async function call_update_vote(
  topicId: string,
  userId: string,
  questionId: string,
  voteValue: number
) {
  const response = await fetch("/api/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topicId, userId, questionId, voteValue }),
  });
  const data = await response.json();
  return data;
}

export async function call_get_vote_counts(question_id: string) {
  const response = await fetch(`/api/vote_counts?question=${question_id}`);
  const data = await response.json();
  return data;
}

export async function call_get_votes_by_person_for_topic(
  person: string,
  topic: string
) {
  const response = await fetch(
    `/api/votes_by_person_for_topic?person=${person}&topic=${topic}`
  );
  const data = await response.json();
  return data;
}
