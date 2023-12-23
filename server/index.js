const express = require("express");
const { createServer } = require("http");
const io = require("socket.io");

const app = express();
const httpServer = createServer(app);

const socketServer = io(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const allVisitors = [];

const emitVisitors = () => {
  socketServer.emit("visitors", allVisitors);
};

socketServer.on("connection", (socket) => {
  console.log("user connected");

  socket.on("new_visitor", (user) => {
    // Check if the user already exists before adding
    const existingUser = allVisitors.find((v) => v.ip === user.ip);
    if (!existingUser) {
      socket.user = user;
      console.log("new visitor ", user);
      allVisitors.push(user);
      emitVisitors();
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = 6001;
httpServer.listen(port, function () {
  console.log(`listening on *:${port}`);
});
