/*
const express = require("express");
const isAuthenticRequest = require("../Middlewares/authentication");
const {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} = require("../Controllers/message");
*/

import express from "express";
import isAuthenticRequest from "../Middlewares/authentication.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../Controllers/message.js";

const router = express.Router();

router.get("/users", isAuthenticRequest, getUsersForSidebar);
router.get("/:userToChatId", isAuthenticRequest, getMessages);
router.post("/send/:id", isAuthenticRequest, sendMessage);

// module.exports = router;
export default router;
