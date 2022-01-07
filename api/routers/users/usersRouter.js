const express = require("express");

const router = express.Router();
const Users = require("./usersModel");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await Users.getAllUsers();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const addedUser = await Users.insertUser(req.body);
    res.status(201).json(addedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
