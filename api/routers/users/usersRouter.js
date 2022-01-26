const express = require("express");

const router = express.Router();
const Users = require("./usersModel");
const MW = require("./usersMW");
const bcrypt = require("bcrypt");
const { tokenBuilder } = require("../../token-builder");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await Users.getAllUsers();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
});

// signup - creates a new user and "logs in" at the same time. Return the newly created user and a token
router.post(
  "/create",
  MW.validateUserPayload,
  MW.checkEmailUnique,
  MW.hashPassword,
  async (req, res, next) => {
    try {
      const addedUser = await Users.insertUser(req.body);
      const token = tokenBuilder(addedUser);
      res.status(201).json({ token, addedUser });
    } catch (err) {
      next(err);
    }
  }
);

// logging in - returns a token for session maintenance to front end
router.post("/login", MW.checkEmailExists, async (req, res, next) => {
  const { password } = req.body;
  const { password: hashedPassword } = req.user;
  const matches = bcrypt.compareSync(password, hashedPassword);
  if (matches) {
    const token = tokenBuilder(req.user);
    res.status(201).json({ token });
  } else {
    next({ message: "invalid credentials", status: 401 });
  }
});

module.exports = router;
