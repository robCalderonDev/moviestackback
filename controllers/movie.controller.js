const Movies = require("../models/movies.model");

const getMovies = async (req, res) => {
  try {
    const movies = await Movies.find({}).limit(10);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
