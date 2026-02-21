const { Router } = require("express");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const router = Router();

router.get("/", (req, res) => {
  res.render("boilerplate", { view: "index", messages });
});

router.get("/new", (req, res) => {
  res.render("boilerplate", { view: "form" });
});

router.post("/new", (req, res) => {
  const { user, text } = req.body;
  messages.push({ text, user, added: new Date() });
  res.redirect("/");
});

router.get("/:idx", (req, res) => {
  const idx = req.params.idx;
  res.render("boilerplate", { view: "message", ...messages[idx] });
});

module.exports = router;
