const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const configureDB = require("./Config/configDB");
const authenticationRouter = require("./Routes/authentication");

const app = express();

dotEnv.config();

// middlewares setup
app.use("/api/authentication", authenticationRouter);

configureDB(app);
