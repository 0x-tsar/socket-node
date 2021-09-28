const { on } = require("events");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const Web3 = require("web3");
const Donations = require("./contracts/Donations.json");

const web3 = new Web3(
  "wss://kovan.infura.io/ws/v3/d036a59d3f7d4cceab5b5ec68e2c114a"
);

const evento = new web3.eth.Contract(
  Donations.abi,
  Donations.networks["42"].address
);

evento.events
  .newDonation(
    {
      fromBlock: 0,
    },
    function (error, event) {
      console.log(event);
    }
  )
  .on("data", function (event) {
    console.log(`A DONATION WAS MADE!`);
    console.log(`-----------`);
    console.log(event); // same results as the optional callback above
  })
  .on("changed", function (event) {
    // remove event from local database
  })
  .on("error", console.error);

///
///
///
///
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
    console.log("msg..");
    socket.emit("message", "clickk");
    // io.to("room_one").emit("room_message", "click");
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
