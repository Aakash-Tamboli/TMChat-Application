// const { v2: cloudinary } = require("cloudinary");

// const dotEnv = require("dotenv");

import { v2 as cloudinary } from "cloudinary";

import dotEnv from "dotenv";

dotEnv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// module.exports = cloudinary;
export default cloudinary;
