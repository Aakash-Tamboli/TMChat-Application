/*
const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const configureDB = require("./Config/configDB");
const authenticationRouter = require("./Routes/authentication");
const messageRouter = require("./Routes/message.js");
const { app, server } = require("./Config/socket.js");
*/

import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import configureDB from "./Config/configDB.js";
import authenticationRouter from "./Routes/authentication.js";
import messageRouter from "./Routes/message.js";
import { app, server } from "./Config/socket.js";

dotEnv.config();

const __dirname = path.resolve(); // I don't know why but __dirname
// not available in render environment
// So this is sol. suggest by my friend.

// middlewares setup
/*
Help get from CHAT-GPT, while 
app.use(express.json({ limit: '50mb' })); // Adjust size as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));
 */

app.use(
  express.json({
    limit: "50mb",
  }),
);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/authentication", authenticationRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client-app/dist")));

  app.get("*", function (request, response) {
    response.sendFile(
      path.join(__dirname, "../client-app", "dist", "index.html"),
    );
  });
}

configureDB(server);
