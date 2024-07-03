const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user.model");
const Movies = require("./models/movies.model");
const movieRoutes = require("./routes/movies.route");
const app = express();
const port = 3000;
//middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//routes

app.use("/api/movies", movieRoutes);

app.get("/api/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/user", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});

mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => {
    console.log("Mongo is connected");
  })
  .catch((err) => {
    console.log(err);
  });
