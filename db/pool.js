const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: "postgresql://dgutierrez:pentek@localhost:5432/top_messages",
});
