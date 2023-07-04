CREATE DATABASE voting_system;

\c voting_system; -- This command is used to switch to the new database

CREATE TABLE Votes (
    topic_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    question_id VARCHAR(255) NOT NULL,
    vote_value INT CHECK(vote_value IN (1, 0, -1)) NOT NULL,
    timestamp TIMESTAMP NOT NULL
    PRIMARY KEY(topic_id, user_id, question_id)
);

CREATE INDEX idx_votes_user_id ON Votes (user_id);
CREATE INDEX idx_votes_topic_id ON Votes (topic_id);
CREATE INDEX idx_votes_question_id ON Votes (question_id);
CREATE INDEX idx_votes_timestamp ON Votes (timestamp);