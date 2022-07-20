const userService = require("../services/usersService");
const jwt = require("jsonwebtoken");

const createNewUser = async (req, res, next) => {
  try {
    const {
      body: { email, name, password },
    } = req;
    const newUser = { email, name, passwordHash: password };

    const userExists = await userService.getUserByEmail(email);
    if (userExists) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const createdUser = await userService.createNewUser(newUser);
    if (createdUser) {
      const token = jwt.sign(
        {
          user_id: createdUser.user_id,
          email: createdUser.email,
          type: createdUser.type,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(201).json({ message: "Registered successfully", token });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
};
