/*

const User = require("../Models/user");
const Message = require("../Models/message");
const cloudinary = require("../Config/cloudinary");
const { getReceiverSocketId, socketIO } = require("../Config/socket");

*/

import User from "../Models/user.js";
import Message from "../Models/message.js";
import cloudinary from "../Config/cloudinary.js";
import { getReceiverSocketId, socketIO } from "../Config/socket.js";

async function getUsersForSidebar(request, response) {
  try {
    const loggedInUserId = request.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    response.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar controller: ", error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMessages(request, response) {
  try {
    const { userToChatId } = request.params;
    const myId = request.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    response.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages controller: ", error.message);
    response.status(500).json({ message: "Internal Server Error" });
  }
}

async function sendMessage(request, response) {
  try {
    const { text, image } = request.body;
    const { id: receiverId } = request.params;
    const senderId = request.user._id;

    let cloudinaryImageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      cloudinaryImageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: cloudinaryImageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      socketIO.to(receiverSocketId).emit("newMessage", newMessage);
    }

    response.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller: ", error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
}

/*
module.exports = {
  getUsersForSidebar,
  getMessages,
  sendMessage,
};
*/
export { getUsersForSidebar, getMessages, sendMessage };
