const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const usersRouter = require("./routers/users/usersRouter");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", usersRouter);

// eslint-disable-next-line
server.use((err, req, res, next) => {
  const { status, message, stack } = err;
  res.status(status || 500).json({
    message,
    stack,
  });
});

module.exports = server;
