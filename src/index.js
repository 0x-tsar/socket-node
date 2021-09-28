const { on } = require("events");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("join", function (room) {
    socket.join(room);
  });

  socket.on("room_message", function (data) {
    io.to("room_one").emit("room_message", { world: "world" });
  });

  socket.on("message", (msg) => {
    io.to("room_one").emit("room_message", "click");
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
