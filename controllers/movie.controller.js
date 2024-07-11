const Movies = require("../models/movies.model");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const getMovies = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  //verifica si el token es correcto

  try {
    const movies = await Movies.find({}).limit(10);
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (!data) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movies.findById(id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putMovie = async (req, res) => {
  try {
    const { id, body } = req.params;
    await Movies.findByIdAndUpdate(id, body);
    if (!Movies) {
      return res
        .status(404)
        .json({ message: `movie with id: ${id} not found` });
    }
    const updatedMovie = await Movies.findById(id);

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//delete movie

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movies.findByIdAndDelete(id);
    if (!movie) {
      return res
        .status(404)
        .json({ message: `movie with id: ${id} not found` });
    }
    res.status(200).json({ message: "movie deleted sussefully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMovies,
  getMovie,
  putMovie,
  deleteMovie,
};
