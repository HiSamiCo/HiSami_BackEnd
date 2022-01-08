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
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db("users").insert(user, [
    "user_id",
    "email",
    "password",
    "first_name",
    "last_name",
    "admin",
  ]);
  return newUserObject; // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
};

module.exports = {
  getAllUsers,
  insertUser,
  getUserByEmail,
  getUserById,
};
