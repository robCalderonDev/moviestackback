const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  plot: String,
  genres: [String],
  runtime: Number,
  rated: String,
  cast: [String],
  title: String,
  fullplot: String,
  languages: [String],
  released: Date,
  directors: [String],
  writers: [String],
  awards: {
    wins: Number,
    nominations: Number,
    text: String,
  },
  lastupdated: { type: Date, default: Date.now },
  year: Number,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  countries: [String],
  type: String,
  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    dvd: Date,
    lastUpdated: Date,
  },
  num_mflix_comments: { type: Number, default: 0 },
});

const Movies = mongoose.model("movies", movieSchema);

module.exports = Movies;
