import bcrypt from "bcryptjs";
import Router from "express";
import User from "../models/user.js";

const usersRouter = Router();

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response.status(400).json({ error: "username or password missing" });
  }

  if (username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .json({ error: "username or password too short, minimum length is 3" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser.toJSON());
});

export default usersRouter;
