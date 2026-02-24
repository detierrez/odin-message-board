const { Router } = require("express");
const {
  getMessages,
  getNewMessage,
  postNewMessage,
  getMessage,
} = require("../controllers/messagesController");

const router = Router();

router.get("/", getMessages);
router.get("/new", getNewMessage);
router.post("/new", postNewMessage);

router.get("/:id", getMessage);

module.exports = router;
