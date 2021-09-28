const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

require("dotenv").config();

io.on("connection", (socket) => {
  console.log("a user connected");
});

const middlewares = require("./middlewares");
const api = require("./api");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
//   });
// });

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
