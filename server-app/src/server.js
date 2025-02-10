const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const configureDB = require("./Config/configDB");
const authenticationRouter = require("./Routes/authentication");
const messageRouter = require("./Routes/message.js");
const { app, server } = require("./Config/socket.js");

dotEnv.config();
const __dirname = path.resolve();
// middlewares setup
/*
Help get from CHAT-GPT, while 
app.use(express.json({ limit: '50mb' })); // Adjust size as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));
 */

app.use(express.json({
  limit: "50mb"
}));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/authentication", authenticationRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../client-app/dist")));

  app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "../client-app", "dist", "index.html"));
  });
}


configureDB(server);
