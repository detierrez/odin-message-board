#! /usr/bin/env node
require("../scripts/loadEnv");

const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  added TIMESTAMPTZ,
  username VARCHAR ( 255 ),
  text VARCHAR ( 200 )
);

INSERT INTO messages 
  (added, username, text) 
VALUES
  (now(), 'Amando', 'Hi there!'),
  (now(), 'Charles', 'Hello World!'),
  (now(), 'Odin', 'Argh my eyeeeeeee');
`;

(async function main() {
  console.log("seeding db...");
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
})();
