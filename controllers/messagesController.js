const { body, validationResult } = require("express-validator");

const db = require("../db/queries");

const validateMessage = [
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage(`must contain only letters, numbers or '_'`)
    .isLength({ min: 1 })
    .withMessage(`is obligatory`)
    .isLength({ max: 64 })
    .withMessage(`must contain no more than 64 characters`),
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`is obligatory`)
    .isLength({ max: 200 })
    .withMessage(`must contain no more than 200 characters`),
];

module.exports.getMessages = async (req, res) => {
  const messages = await db.getMessages();
  res.render("boilerplate", { view: "index", messages });
};

module.exports.getNewMessage = (req, res) => {
  res.render("boilerplate", { view: "form" });
};

module.exports.postNewMessage = [
  validateMessage,
  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const { username, text } = req.body;
    return res
      .status(400)
      .render("boilerplate", {
        view: "form",
        errors: errors.array(),
        username,
        text,
      });
  },
  async (req, res) => {
    const { username, text } = req.body;
    await db.createMessage(new Date(), username, text);
    res.redirect("/");
  },
];

module.exports.getMessage = async (req, res) => {
  const { id } = req.params;
  const message = await db.getMessage(id);
  console.log(id, message);
  res.render("boilerplate", { view: "message", message });
};
