const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const socketIO = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

// used to store online users
const userSocketMap = {}; // structure will be like { userId: socketId}

socketIO.on("connection", function (socket) {
    console.log("A User connected", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) userSocketMap[userId] = socket.id;


    // socket.emit() is used to send events to all the connected clients

    socketIO.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", function () {
        console.log("A User disconnected", socket.id);
        delete userSocketMap[userId];
        socketIO.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}



module.exports = {
    socketIO,
    app,
    server,
    getReceiverSocketId
}