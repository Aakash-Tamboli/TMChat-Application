/*

const User = require("../Models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../Config/cloudinary.js");
*/

import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../Config/cloudinary.js";

async function generateToken(userId, response) {
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: "7d",
  });

  response.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Milli second from Chat-gpt
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
}

async function signup(request, response) {
  const { fullName, email, password } = request.body;
  console.log("Hiii");
  try {
    if (!fullName || !email || !password) {
      return response.status(400).json({
        message: "fullName, email and password required",
      });
    }
    if (password.length < 6) {
      return response.status(400).json({
        message: "Password required and Password must be at least 6 Characters",
      });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return response.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (user) {
      // generat jwt token here
      generateToken(user._id, response);
      const document = await user.save();

      response.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } else {
      response.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in sign up controller");
    response.status(500).json({ message: "Internal Server Error" });
  }
}

async function login(request, response) {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return response.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, response);

    response.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller");
    response.status(500).json({ message: "Internal Server Error" });
  }
}

async function logout(request, response) {
  try {
    response.cookie("jwt", "", { maxAge: 0 });
    response.status(200).json({ message: "Logged out sucessfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    response.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateProfile(request, response) {
  try {
    const { profilePic } = request.body;
    const userId = request.user._id;

    if (!profilePic) {
      return response.status(400).json({ message: "Profile Pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedDocument = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true },
    );

    response.status(200).json({ updatedUser: updatedDocument });
  } catch (error) {
    console.error("Error Occured in updateProfile Controller");
    response.status(500).json({ message: "Internal Server Error" });
  }
}

// whenver user reload front-end I'll check where they needs to be directed like homepage or login page
function checkAuthenticated(request, response) {
  try {
    response.status(200).json(request.user);
  } catch (error) {
    console.log("Error in checkAuthenticated controller", error.message);
    response.status(500).json({ message: "Internal Server Error" });
  }
}

/*
module.exports = {
  signup,
  login,
  logout,
  generateToken,
  updateProfile,
  checkAuthenticated,
};
*/
export {
  signup,
  login,
  logout,
  generateToken,
  updateProfile,
  checkAuthenticated,
};
