// Redux
import { useSelector, useDispatch } from 'react-redux'
import {
  resetMovies,
  sortMoviesAtoZ,
  sortMoviesZtoA,
  sortMoviesOneToTen,
  sortMoviesTenToOne,
  //filterMoviesGenre,
  getMovies
} from '../redux/services/movies/getMovies'

import {
  resetShows,
  sortShowsAtoZ,
  sortShowsZtoA,
  sortShowsOneToTen,
  sortShowsTenToOne,
  //filterShowsGenre,
  getTvShows
} from '../redux/services/shows/getTvShows'

export const useSortFilter = () => {
  const movies = useSelector(state => state.movies.movies)
  const sortedMovies = useSelector(state => state.movies.sortedMovies)
  const shows = useSelector(state => state.tvShows.shows)
  const sortedShows = useSelector(state => state.tvShows.sortedShows)
  const dispatch = useDispatch()

  // Sort Movies
  const sortMovies = value => {
    if (value === 0) {
      const films = []

      movies.forEach(film => {
        films.push(film)
      })

      const all = films.map(movie => movie)

      dispatch(resetMovies({ movies: all, sortValue: 'All' }))
    }

    if (value === 1) {
      const films = []

      sortedMovies.forEach(film => {
        films.push(film)
      })

      const sorted = films.sort(function (a, b) {
        if (a.title) return a.title.localeCompare(b.title)
        return -1
      })

      dispatch(sortMoviesAtoZ({ movies: sorted, sortValue: 'Title (A - Z)' }))
    }

    if (value === 2) {
      const films = []

      sortedMovies.forEach(film => {
        films.push(film)
      })

      const sorted = films.sort(function (a, b) {
        if (b.title) return b.title.localeCompare(a.title)
        return -1
      })

      dispatch(sortMoviesZtoA({ movies: sorted, sortValue: 'Title (Z - A)' }))
    }

    if (value === 3) {
      const films = []

      sortedMovies.forEach(film => {
        films.push(film)
      })

      const sorted = films.sort((a, b) => a.vote_average - b.vote_average)

      dispatch(
        sortMoviesOneToTen({ movies: sorted, sortValue: 'Rating (1 - 9)' })
      )
    }

    if (value === 4) {
      const films = []

      sortedMovies.forEach(film => {
        films.push(film)
      })

      const sorted = films.sort((a, b) => b.vote_average - a.vote_average)

      dispatch(
        sortMoviesTenToOne({ movies: sorted, sortValue: 'Rating (9 - 1)' })
      )
    }
  }

  // Sort Shows
  const sortShows = value => {
    if (value === 0) {
      const films = []

      shows.forEach(film => {
        films.push(film)
      })

      const all = films.map(movie => movie)

      dispatch(resetShows({ shows: all, sortValue: 'All' }))
    }

    if (value === 1) {
      const films = []

      sortedShows.forEach(film => {
        films.push(film)
      })

      const sorted = films.sort(function (a, b) {
        if (a.name) return a.name.localeCompare(b.name)
        return -1
      })

      dispatch(sortShowsAtoZ({ shows: sorted, sortValue: 'Title (A - Z)' }))
    }

    if (value === 2) {
      const films = []

      sortedShows.forEach(film => {
        films.push(film)
      })

      const sorted = films.sort(function (a, b) {
        if (b.name) return b.name.localeCompare(a.name)
        return -1
      })

      dispatch(sortShowsZtoA({ shows: sorted, sortValue: 'Title (Z - A)' }))
    }

    if (value === 3) {
      const films = []

      sortedShows.forEach(film => {
        films.push(film)
      })

      const sorted = films.sort((a, b) => a.vote_average - b.vote_average)

      dispatch(
        sortShowsOneToTen({ shows: sorted, sortValue: 'Rating (1 - 10)' })
      )
    }

    if (value === 4) {
      const films = []

      sortedShows.forEach(film => {
        films.push(film)
      })

      const sorted = films.sort((a, b) => b.vote_average - a.vote_average)

      dispatch(
        sortShowsTenToOne({ shows: sorted, sortValue: 'Rating (10 - 1)' })
      )
    }
  }

  // Filter Movies
  // const filterMovies = async (id, value, url) => {
  //   if (id === 0) {
  //     const films = []

  //     movies.forEach(film => {
  //       films.push(film)
  //     })

  //     const reset = films.map(movie => movie)

  //     dispatch(filterMoviesGenre({ movies: reset, genre: value }))
  //   } else {
  //     const films = []

  //     movies.forEach(film => {
  //       films.push(film)
  //     })

  //     // const pageNo = Number(sessionStorage.getItem('page'))
  //     // const page = pageNo ? pageNo : 1

  //     // sessionStorage.setItem('page', page)

  //     // if (page === 1) {
  //     //   dispatch(getMovies(url + `&with_genres=${id}`))
  //     // } else {
  //     //   dispatch(getMovies(url + `&with_genres=${id}&page=${page}`))
  //     // }

  //     // dispatch(filterGenre({ genre: value }))

  //     const filteredMovies = films.filter(movie => movie.genre_ids.includes(id))

  //     dispatch(filterGenre({ movies: filteredMovies, genre: value }))
  //   }
  // }

  return { sortMovies, sortShows }
}
