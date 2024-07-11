const User = require("../models/user.model");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postUser = async (req, res) => {
  const { name, email, password } = req.body;

  Validation.name(name, res);
  Validation.email(email, res);
  Validation.password(password, res);
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({ error: "Email already in use" });
  }
  const hashedPassword = await bcrypt.hash(password, 10); //salt

  try {
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  Validation.email(email, res);
  Validation.password(password, res);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const publicUser = {
    name: user.name,
    email: user.email,
    id: user._id,
  };
  const token = jsonwebtoken.sign(
    { id: user._id, email: email, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return res
    .cookie("access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60, //cookie tiene validez de 1 hora
    })
    .status(200)
    .json({ message: "Login successful", publicUser, token });
};

//validaciones
class Validation {
  static name(name, res) {
    if (typeof name !== "string") {
      return res.status(400).json({ error: "Name must be a string" });
    }
  }
  static email(email, res) {
    if (typeof email !== "string") {
      return res.status(400).json({ error: "Email must be a string" });
    }
  }
  static password(password, res) {
    if (typeof password !== "string") {
      return res.status(400).json({ error: "Password must be a string" });
    }
  }
}

module.exports = {
  getUser,
  postUser,
  Login,
};
