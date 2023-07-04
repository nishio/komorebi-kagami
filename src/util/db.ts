const { Pool } = require("pg");

export const db = new Pool({
  host: process.env.POSTGRES_HOST,
  database: "voting_system",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});
