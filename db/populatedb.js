#! /usr/bin/env node
const { argv } = require("node:process");
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
  const URI = getURI();

  if (!URI) {
    return console.log(`Usage:
      populatedb dev
      populatedb prod`);
  }

  console.log("seeding db...");
  const client = new Client({ connectionString: URI });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
})();

function getURI() {
  switch (argv[2]) {
    case "dev":
      return "postgresql://dgutierrez:pentek@localhost:5432/top_messages";
    case "prod":
      return "";
    default:
      return null;
  }
}
