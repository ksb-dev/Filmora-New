export const APIs = {
  popular_movies_url: `https://api.themoviedb.org/3/discover/movie?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US&sort_by=popularity.desc&adult=false`,

  playing_movies_url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US&adult = false
`,

  topRated_movies_url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US&adult = false`,

  genre_movies_url: `https://api.themoviedb.org/3/discover/movie?api_key=${
    import.meta.env.VITE_KEY
  }&sort_by=vote_count.desc&adult = false`,

  //https://api.themoviedb.org/3/discover/movie?with_genres=28&page=2&api_key=732dfe94c237f44327af913ebba97825

  popular_tv_url: `https://api.themoviedb.org/3/tv/popular?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US&adult = false`,

  topRated_tv_url: `https://api.themoviedb.org/3/tv/top_rated?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US&adult = false`,

  onAir_tv_url: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US&adult = false`,

  latest_tv_url: `https://api.themoviedb.org/3/tv/latest?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US&adult = false`,

  genre_tv_url: `https://api.themoviedb.org/3/discover/tv?api_key=${
    import.meta.env.VITE_KEY
  }&sort_by=vote_count.desc&adult = false`,

  no_image_url:
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png",

  img_path: "https://image.tmdb.org/t/p/w1280",
  img_path_original: "https://image.tmdb.org/t/p/original",

  // Backdrops
  img_path_w300: "https://image.tmdb.org/t/p/w780",
  //img_path_w300: 'https://image.tmdb.org/t/p/original',
  img_path_w780: "https://image.tmdb.org/t/p/w780",
  //img_path_w780: 'https://image.tmdb.org/t/p/original',

  // Posters
  img_path_w92: "https://image.tmdb.org/t/p/w92",
  //img_path_w92: 'https://image.tmdb.org/t/p/original',
  img_path_w154: "https://image.tmdb.org/t/p/w154",
  //img_path_w154: 'https://image.tmdb.org/t/p/original',
  img_path_w342: "https://image.tmdb.org/t/p/w342",
  //img_path_w342: 'https://image.tmdb.org/t/p/original',
  img_path_w500: "https://image.tmdb.org/t/p/w500",
  //img_path_w350: 'https://image.tmdb.org/t/p/original',

  // Profile
  img_path_w45: "https://image.tmdb.org/t/p/w45",
  //img_path_w45: 'https://image.tmdb.org/t/p/original',
  img_path_h632: "https://image.tmdb.org/t/p/h632",
  //img_path_h632: 'https://image.tmdb.org/t/p/original',

  // Posters & profiles
  img_path_w185: "https://image.tmdb.org/t/p/w342",
  //img_path_w185: 'https://image.tmdb.org/t/p/original',

  imdb_url: `https://www/imdb.com/title/`,

  search__movie__url: `https://api.themoviedb.org/3/search/movie?api_key=${
    import.meta.env.VITE_KEY
  }&adult = false`,

  search__tv__url: `https://api.themoviedb.org/3/search/tv?api_key=${
    import.meta.env.VITE_KEY
  }&adult = false`,

  //https://api.themoviedb.org/3/discover/movie?with_genres=12&page=1&api_key=732dfe94c237f44327af913ebba97825

  // login_url: `/url/api/v1/filmora/auth/login`,
  // register_url: `/url/api/v1/filmora/auth/register`,

  // get_movies_url: `/url/api/v1/filmora/movies`,
  // add_movie_url: `/url/api/v1/filmora/movies`,
  // delete_movie_url: `/url/api/v1/filmora/movies/`,

  // get_shows_url: `/url/api/v1/filmora/shows`,
  // add_show_url: `/url/api/v1/filmora/shows`,
  // delete_show_url: `/url/api/v1/filmora/shows/`,

  login_url: `https://tmdb-back-fgkb.onrender.com/api/v1/filmora/auth/login`,
  register_url: `https://tmdb-back-fgkb.onrender.com/api/v1/filmora/auth/register`,

  get_movies_url: `https://tmdb-back-fgkb.onrender.com/api/v1/filmora/movies`,
  add_movie_url: `https://tmdb-back-fgkb.onrender.com/api/v1/filmora/movies`,
  delete_movie_url: `https://tmdb-back-fgkb.onrender.com/api/v1/filmora/movies/`,

  get_shows_url: `https://tmdb-back-fgkb.onrender.com/api/v1/filmora/shows`,
  add_show_url: `https://tmdb-back-fgkb.onrender.com/api/v1/filmora/shows`,
  delete_show_url: `https://tmdb-back-fgkb.onrender.com/api/v1/filmora/shows/`,
};
