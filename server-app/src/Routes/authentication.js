const express = require("express");
const { signup, login, logout } = require("../Controllers/authentication");

const authenticationRouter = express.Router();

authenticationRouter.post("/signup",signup);
authenticationRouter.post("/login",login);
authenticationRouter.post("/logout",logout);

module.exports = authenticationRouter;
