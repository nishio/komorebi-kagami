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
  const response = await fetch(
    `/api/get_vote_counts?questionId=${question_id}`
  );
  const data = await response.json();
  return data;
}
