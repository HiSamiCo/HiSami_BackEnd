const db = require("../../data/db-config.js");

const getAllUsers = () => {
  return db("users");
};

const getUserBy = (user) => {
  return db("users").where(user);
};

const getUserByEmail = (email) => {
  return getUserBy({ email }).first();
};

const getUserById = (user_id) => {
  return getUserBy({ user_id }).first();
};

const insertUser = async (user) => {
  const [newUserObject] = await db("users").insert(user, [
    "user_id",
    "email",
    "password",
    "first_name",
    "last_name",
    "admin",
  ]);
  return newUserObject;
};

module.exports = {
  getAllUsers,
  insertUser,
  getUserByEmail,
  getUserById,
};
