const db = require("../db/queries");

module.exports.getMessages = async (req, res) => {
  const messages = await db.getMessages();
  res.render("boilerplate", { view: "index", messages });
};

module.exports.getNewMessage = (req, res) => {
  res.render("boilerplate", { view: "form" });
};

module.exports.postNewMessage = async (req, res) => {
  const { username, text } = req.body;
  await db.createMessage(new Date(), username, text);
  res.redirect("/");
};

module.exports.getMessage = async (req, res) => {
  const { id } = req.params;
  const message = await db.getMessage(id);
  console.log(id, message);
  res.render("boilerplate", { view: "message", message });
};
