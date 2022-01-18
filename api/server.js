const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const usersRouter = require("./routers/users/usersRouter");
const productsRouter = require("./routers/products/productsRouter");
const cartsRouter = require("./routers/carts/cartsRouter");
const userMW = require("./routers/users/usersMW");
const stripeRouter = require("./stripe/StripeRouter");
const cartsMW = require("./routers/carts/cartsMW");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/products", productsRouter);
server.use("/api/carts", userMW.isAuthorized, cartsRouter);
server.use(
  "/api/stripe",
  userMW.isAuthorized,
  cartsMW.validateUserCart,
  stripeRouter
);

// eslint-disable-next-line
server.use((err, req, res, next) => {
  const { status, message, stack } = err;
  res.status(status || 500).json({
    message,
    stack,
  });
});

module.exports = server;
