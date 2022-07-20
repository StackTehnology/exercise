const User = require("../models").users;

const createNewUser = async (newUser) => {
  
  return await User.create(newUser);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  createNewUser,
  getUserByEmail,
};