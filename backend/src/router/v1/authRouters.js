const authRouter = require("express").Router();
const userController = require("../../controller/usersController");
const { generateToken } = require("../../middleware/security");
const { validateUser, loginValidation } = require("../../middleware/validation");

authRouter.post("/register",validateUser, userController.createNewUser);
authRouter.post("/login", loginValidation, generateToken);

module.exports = authRouter;