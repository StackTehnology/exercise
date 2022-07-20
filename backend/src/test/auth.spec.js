const jwt = require("jsonwebtoken");
const server = require("..");
const request = require("supertest");
const User = require("../models").users;

describe("Testing the auth API", () => {
  test("Should singIn successfully", async () => {
    ({ email, password, type } = {
      email: "bloger@mail.md",
      password: "test1111",
      type: "blogger",
    });

    const response = await request(server)
      .post("/api/v1/auth/login")
      .send({ email, password })
      .expect(200);
    const { newToken } = response.body;

    jwt.verify(newToken, process.env.JWT_SECRET, async (err, decoded) => {
      expect({ email, type }).toStrictEqual({ email, type }); // pass

      const { user_id } = decoded;
      const foundUser = await User.findOne({ where: { user_id } });

      expect(foundUser.email).toStrictEqual(email);
    });
  });

  test("Should singIn failed", async () => {
    ({ email, password } = {
      email: "singInFailed@mail.md",
      password: "bla-bla-bla",
    });

    const response = await request(server)
      .post("/api/v1/auth/login")
      .send({
        email,
        password,
      })
      .expect(401);
  });

  test("Should signUp a user type blogger successfully", async () => {
    ({ email, password, name, type } = {
      email: "newUser@mail.md",
      password: "newUserPassword",
      name: "newUser",
      type: "blogger",
    });

    const response = await request(server)
      .post("/api/v1/auth/register")
      .send({
        email,
        password,
        name,
        type,
      })
      .expect(200);
    const { token } = response.body;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      expect({ email, type }).toStrictEqual({ email, type }); // pass

      const { user_id } = decoded;
      const foundUser = await User.findOne({ where: { user_id } });

      expect(foundUser.email).toStrictEqual(email);
    });
  });

  test("Should signUp a user type admin failed", async () => {
    ({ email, password, name, type } = {
      email: "newUserAdmin@mail.md",
      password: "newUserAdminPassword",
      name: "newUserAdmin",
      type: "admin",
    });

    const response = await request(server)
      .post("/api/v1/auth/register")
      .send({
        email,
        password,
        name,
        type,
      })
      .expect(422);
  });
});