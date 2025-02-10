const express = require("express");
const {
  signup,
  login,
  logout,
  updateProfile,
  checkAuthenticated,
} = require("../Controllers/authentication");

const isAuthenticRequest = require("../Middlewares/authentication");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update/profile-pic", isAuthenticRequest, updateProfile);
router.get("/check", isAuthenticRequest, checkAuthenticated);

module.exports = router;
