const Users = require("./usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jwt-decode");

const validateUserPayload = (req, res, next) => {
  const { body } = req;
  const mandatoryKeys = ["password", "email", "first_name", "last_name"];
  mandatoryKeys.forEach((key) => {
    const trimmedKey = body[key].trim();
    if (!trimmedKey)
      return next({ message: `${key} cannot be null`, status: 400 });
    body[key] = trimmedKey;
  });
  next();
};

const checkEmailUnique = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await Users.getUserByEmail(email);
    if (existingUser) {
      next({ message: "Email already in use.", status: 404 });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkEmailExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await Users.getUserByEmail(email);
    if (!existingUser) {
      next({ message: "Email does not exist.", status: 400 });
    } else {
      req.user = existingUser;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const HASH_ROUNDS = parseInt(process.env.HASH_ROUNDS) || 10;

// hashes the sent password
const hashPassword = (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, HASH_ROUNDS);
  req.body.password = hashedPassword;
  next();
};

// checks that the user is logged in
const isAuthorized = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next({ message: "you are not logged in", status: 401 });
  } else {
    const User = jwt(token);
    req.sentUser = User;
    next();
  }
};

// checks if they are an admin
const isAdmin = async (req, res, next) => {
  try {
    const { subject } = req.sentUser;
    const { admin } = await Users.getUserById(subject);
    if (!admin) {
      next({ message: "You are not an admin", status: 401 });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkEmailUnique,
  checkEmailExists,
  hashPassword,
  validateUserPayload,
  isAuthorized,
  isAdmin,
};
