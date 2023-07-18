import { Pool } from "pg";
import { parse } from "fast-csv";

const csvData = `"topic_id","user_id","question_id","vote_value","timestamp"
"topic123","user456","question789",1,"2023-07-01T00:00:00Z"
"topic123","user456","question790",0,"2023-07-01T01:00:00Z"
...`;

// PostgreSQLに接続するための設定を作成します
const pool = new Pool({
  user: "your_user",
  host: "your_host",
  database: "your_database",
  password: "your_password",
  port: 5432,
});

// パースしたCSVデータを保存するための配列
let csvRows = [];

// CSVデータをパースします
parse(csvData, { headers: true })
  .on("data", (row) => {
    csvRows.push(row);
  })
  .on("end", async (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);

    // パースしたデータをPostgreSQLに挿入します
    for (let row of csvRows) {
      const { topic_id, user_id, question_id, vote_value, timestamp } = row;
      try {
        const res = await pool.query(
          `INSERT INTO Votes (topic_id, user_id, question_id, vote_value, timestamp) VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (topic_id, user_id, question_id) DO UPDATE SET vote_value = EXCLUDED.vote_value, timestamp = EXCLUDED.timestamp`,
          [topic_id, user_id, question_id, vote_value, new Date(timestamp)]
        );
        console.log(`Inserted row with id: ${res.rows[0].id}`);
      } catch (err) {
        console.error(`Failed to insert row: ${err}`);
      }
    }
  });
