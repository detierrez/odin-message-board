const pool = require("./pool");

module.exports.getMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
};

module.exports.createMessage = async (added, username, text) => {
  console.log(added);
  await pool.query(
    `
    INSERT INTO messages 
      (added, username, text) 
    VALUES 
      ($1, $2, $3)`,
    [added, username, text],
  );
};

module.exports.getMessage = async (id) => {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0];
};
