import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// APIs
import { APIs } from '../../../APIs/APIs'

const initialState = {
  movies: [],
  sortedMovies: [],
  totalPages: 0,
  loading: false,
  error: {
    msg: '',
    isError: false
  },
  sortState: 'All',
  filterState: 'All'
}

export const getMovies = createAsyncThunk(
  'movies/getMovies',

  async category => {
    const pageNo = Number(sessionStorage.getItem('page'))
    const page = pageNo ? pageNo : 1

    sessionStorage.setItem('page', page)

    const searchPageNo = Number(sessionStorage.getItem('searchPage'))
    const searchPage = searchPageNo ? searchPageNo : 1

    sessionStorage.setItem('searchPage', searchPage)

    var data, res

    if (category === 'Popular') {
      if (page === 1) {
        data = await fetch(APIs.popular_movies_url)
      } else {
        data = await fetch(APIs.popular_movies_url + `&page=${page}`)
      }
    } else if (category === 'In Theatres') {
      if (page === 1) {
        data = await fetch(APIs.playing_movies_url)
      } else {
        data = await fetch(APIs.playing_movies_url + `&page=${page}`)
      }
    } else if (category === 'Top Rated') {
      if (page === 1) {
        data = await fetch(APIs.topRated_movies_url)
      } else {
        data = await fetch(APIs.topRated_movies_url + `&page=${page}`)
      }
    } else if (category === 'savedMovies') {
      const savedToken = sessionStorage.getItem('token')
      let response = ''

      if (savedToken) {
        response = await axios.get(APIs.get_movies_url, {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        })
      }

      return response.data.movies
    } else if (category.value === 'genre') {
      if (page === 1) {
        data = await fetch(
          APIs.genre_movies_url + `&with_genres=${category.id}`
        )
      } else {
        data = await fetch(
          APIs.genre_movies_url + `&with_genres=${category.id}&page=${page}`
        )
      }
    } else if (category === 'search') {
      const searchQuery = sessionStorage.getItem('searchQuery')

      if (searchQuery !== null && page === 1) {
        data = await fetch(APIs.search__movie__url + `&query=${searchQuery}`)
      } else {
        data = await fetch(
          APIs.search__movie__url + `&query=${searchQuery}&page=${searchPage}`
        )
      }
    } else {
      const savedToken = sessionStorage.getItem('token')

      if (savedToken) {
        const response = await axios.get(APIs.get_movies_url, {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        })
        return response.data.movies
      }
    }
    res = await data.json()

    return res
  }
)

const setMoviesSortValues = (state, action) => {
  if (action.payload.movies.length > 0) {
    state.sortedMovies = action.payload.movies
    state.sortState = action.payload.sortValue
    state.filterState = 'All'
    state.error.msg = ''
    state.error.isError = false
  } else {
    state.sortedMovies = []
    state.sortState = action.payload.sortValue
    state.filterState = 'All'
    state.error.msg = `No movies found! Please try again later.`
    state.error.isError = true
  }
}

const setMoviesFilterValues = (state, action) => {
  if (action.payload.movies.length > 0) {
    state.sortedMovies = action.payload.movies
    state.sortState = 'All'
    state.filterState = action.payload.genre
    state.error.msg = ''
    state.error.isError = false
  } else {
    state.sortedMovies = []
    state.sortState = 'All'
    state.filterState = action.payload.genre
    state.error.msg = `No "${action.payload.genre}" movies found! Click on different genre.`
    state.error.isError = true
  }
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetMovieSortState: (state, action) => {
      state.sortState = action.payload
    },
    resetMovies: (state, action) => {
      setMoviesSortValues(state, action)
    },
    sortMoviesAtoZ: (state, action) => {
      setMoviesSortValues(state, action)
    },
    sortMoviesZtoA: (state, action) => {
      setMoviesSortValues(state, action)
    },
    sortMoviesOneToTen: (state, action) => {
      setMoviesSortValues(state, action)
    },
    sortMoviesTenToOne: (state, action) => {
      setMoviesSortValues(state, action)
    },
    filterMoviesGenre: (state, action) => {
      setMoviesFilterValues(state, action)
    },
    setMoviesDefault: (state, action) => {
      state.sortState = action.payload
      state.filterState = action.payload
    },
    setMoviesToNull: state => {
      state.movies = []
      state.sortedMovies = []
      state.totalPages = 0
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getMovies.pending, state => {
        state.loading = true
        state.error.isError = false
        state.error.msg = ''
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload.results) {
          state.sortedMovies = action.payload.results
          state.movies = action.payload.results
          state.totalPages = action.payload.total_pages
        } else {
          state.sortedMovies = action.payload
          state.movies = action.payload
        }
        state.error.isError = false
      })
      .addCase(getMovies.rejected, state => {
        console.log('rejected')
        state.loading = false
        state.error.isError = true
        state.error.msg = 'Failed to fetch movies.'
        state.movies = []
        state.sortedMovies = []
        state.totalPages = 0
      })
  }
})

export default moviesSlice.reducer
export const {
  resetMovieSortState,
  resetMovies,
  sortMoviesAtoZ,
  sortMoviesZtoA,
  sortMoviesOneToTen,
  sortMoviesTenToOne,
  filterMoviesGenre,
  setMoviesDefault,
  setMoviesToNull
} = moviesSlice.actions
