const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const movieRoutes = require("./routes/movies.route");
const userRouter = require("./routes/user.route");
const app = express();
const port = 3000;
//middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/movies", movieRoutes);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
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
