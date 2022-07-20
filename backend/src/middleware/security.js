const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../services/usersService");

const tokenValidation = async (req, res, next) => {
  try {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, please SignIn !!!" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token invalid, please SignIn !!!" });
    }
     req.decoded = decoded;
    next();
  });
} catch (error) {
  next(error);
}

};

const generateToken = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await userService.getUserByEmail(email);

    if (!foundUser) {
      res.status(401).json({ error: "User not found" });
    } else {
      const checkPassword = await bcrypt.compare( password, foundUser.passwordHash);
      if (!checkPassword) {
        res.status(400).json({ error: "Password mismatch" });
      } else {
        const newToken = jwt.sign(
          {
            user_id: foundUser.user_id,
            email: foundUser.email,
            type: foundUser.type,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ message: "logIn successfully", newToken });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { tokenValidation, generateToken };