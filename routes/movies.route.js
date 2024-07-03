const express = require("express");
const router = express.Router();
const { getMovies } = require("../controllers/movie.controller");
const { getMovie } = require("../controllers/movie.controller");
const { putMovie } = require("../controllers/movie.controller");
const { deleteMovie } = require("../controllers/movie.controller");

router.get("/", getMovies);

router.get("/:id", getMovie);

router.put("/:id", putMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
