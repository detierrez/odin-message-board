const { env } = require("node:process");

if (env.NODE_ENV !== "production") {
  require("dotenv").config({ quiet: true });
}
