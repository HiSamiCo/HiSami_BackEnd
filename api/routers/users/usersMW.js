const Users = require("./usersModel");
const bcrypt = require("bcrypt");

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

const hashPassword = (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, HASH_ROUNDS);
  req.body.password = hashedPassword;
  next();
};

module.exports = {
  checkEmailUnique,
  checkEmailExists,
  hashPassword,
  validateUserPayload,
};
