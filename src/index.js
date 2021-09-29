// const { on } = require("events");
// const { json } = require("express");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors());

const Web3 = require("web3");
const Donations = require("./contracts/Donations.json");

const web3 = new Web3(
  "wss://kovan.infura.io/ws/v3/d036a59d3f7d4cceab5b5ec68e2c114a"
);

const donations = new web3.eth.Contract(
  Donations.abi,
  Donations.networks["42"].address
);

const loadingLogs = async () => {};

// app.get("/", (req, res) => {
//   // res.sendFile(__dirname + "/index.html");
//   donations.events
//     .newDonation(
//       {
//         fromBlock: 0,
//       },
//       function (error, event) {}
//     )
//     .on("data", function (event) {
//       dados = [];
//       const log = Object.keys(event.returnValues).map((key) => {
//         // console.log(event.returnValues[key]);
//         return event.returnValues[key];
//       });

//       dados.push(log);
//     });

//   console.log(dados);
//   // res.send(JSON.stringify(event)); // INSIDE callback
//   res.json(dados);
// });

let dados = [];

app.get("/", (req, res) => {
  // res.json("😀");
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
    let sum = msg + 1;
    socket.emit("message", sum);
    io.to("room_one").emit("room_message", `message for room_one: ${sum}`);
    // io.to("room_one").emit("room_message", "click");
  });

  donations.events.newDonation({ fromBlock: 0 }, function (error, event) {
    console.log(event);
    socket.emit("new_event", "got new donation");
    // socket.on("interval", () => {
    // console.log("got new donation");
    // });
  });
  //   .on("data", function (event) {
  //     const log = Object.keys(event.returnValues).map((key) => {
  //       return event.returnValues[key];
  //     });
  //     dados.push(log);

  //     console.log(event.returnValues);
  //   });

  // socket.on("interval", () => {
  //   socket.emit("interval", dados);
  //   dados = [];
  //   // setInterval(() => {
  //   //   socket.emit("interval", JSON.stringify(obj));
  //   // }, 2000);
  // });
});

//JSON.parse to convert json in object
//JSON.stringfy to convert object in string

server.listen(5000, () => {
  console.log("listening on *:5000");
});
