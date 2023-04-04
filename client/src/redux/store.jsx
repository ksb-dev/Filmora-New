import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./services/movies/getMovies";
import savedMoviesReducer from "./services/movies/setSavedMovies";
import movieResultsReducer from "./services/movies/getMovieResults";
import tvReducer from "./services/shows/getTvShows";
import savedShowsReducer from "./services/shows/setSavedShows";
import tvResultsReducer from "./services/shows/getTvResults";

export default configureStore({
  reducer: {
    movies: movieReducer,
    savedMovies: savedMoviesReducer,
    movieResults: movieResultsReducer,
    tvShows: tvReducer,
    savedShows: savedShowsReducer,
    tvResults: tvResultsReducer,
  },
  devTools: false,
});
