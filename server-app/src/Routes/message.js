const express = require("express");
const isAuthenticRequest = require("../Middlewares/authentication");
const {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} = require("../Controllers/message");
const router = express.Router();

router.get("/users", isAuthenticRequest, getUsersForSidebar);
router.get("/:userToChatId", isAuthenticRequest, getMessages);
router.post("/send/:id", isAuthenticRequest, sendMessage);

module.exports = router;
