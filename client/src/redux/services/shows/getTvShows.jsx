import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RiCoinsLine } from 'react-icons/ri'

// APIs
import { APIs } from '../../../APIs/APIs'

const initialState = {
  shows: [],
  sortedShows: [],
  totalPages: 0,
  loading: false,
  error: {
    msg: '',
    isError: false
  },
  sortState: 'All',
  filterState: 'All'
}

export const getTvShows = createAsyncThunk(
  'tvs/getTvShows',

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
        data = await fetch(APIs.popular_tv_url)
      } else {
        data = await fetch(APIs.popular_tv_url + `&page=${page}`)
      }
    } else if (category === 'On Air') {
      if (page === 1) {
        data = await fetch(APIs.onAir_tv_url)
      } else {
        data = await fetch(APIs.onAir_tv_url + `&page=${page}`)
      }
    } else if (category === 'Top Rated') {
      if (page === 1) {
        data = await fetch(APIs.topRated_tv_url)
      } else {
        data = await fetch(APIs.topRated_tv_url + `&page=${page}`)
      }
    } else if (category === 'savedShows') {
      const savedToken = sessionStorage.getItem('token')
      let response = ''

      if (savedToken) {
        response = await axios.get(APIs.get_shows_url, {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        })
      }
      return response.data.shows
    } else if (category.value === 'genre') {
      if (page === 1) {
        data = await fetch(APIs.genre_tv_url + `&with_genres=${category.id}`)
      } else {
        data = await fetch(
          APIs.genre_tv_url + `&with_genres=${category.id}&page=${page}`
        )
      }
    } else if (category === 'search') {
      const searchQuery = sessionStorage.getItem('searchQuery')

      if (searchQuery !== null && page === 1) {
        data = await fetch(APIs.search__tv__url + `&query=${searchQuery}`)
      } else {
        data = await fetch(
          APIs.search__tv__url + `&query=${searchQuery}&page=${searchPage}`
        )
      }
    } else {
      const savedToken = sessionStorage.getItem('token')

      if (savedToken) {
        const response = await axios.get(APIs.get_shows_url, {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        })
        return response.data.shows
      }
    }
    res = await data.json()

    return res
  }
)

const setShowsSortValues = (state, action) => {
  if (action.payload.shows.length > 0) {
    state.sortedShows = action.payload.shows
    state.sortState = action.payload.sortValue
    state.filterState = 'All'
    state.error.msg = ''
    state.error.isError = false
  } else {
    state.sortedShows = []
    state.sortState = action.payload.sortValue
    state.filterState = 'All'
    state.error.msg = `No shows found! Please try again later.`
    state.error.isError = true
  }
}

const setShowsFilterValues = (state, action) => {
  if (action.payload.shows.length > 0) {
    state.sortedShows = action.payload.shows
    state.sortState = 'All'
    state.filterState = action.payload.genre
    state.error.msg = ''
    state.error.isError = false
  } else {
    state.sortedShows = []
    state.sortState = 'All'
    state.filterState = action.payload.genre
    state.error.msg = `No "${action.payload.genre}" shows found! Click on different genre.`
    state.error.isError = true
  }
}

export const tvSlice = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {
    resetTvSortState: (state, action) => {
      state.sortState = action.payload
    },
    resetShows: (state, action) => {
      setShowsSortValues(state, action)
    },
    sortShowsAtoZ: (state, action) => {
      setShowsSortValues(state, action)
    },
    sortShowsZtoA: (state, action) => {
      setShowsSortValues(state, action)
    },
    sortShowsOneToTen: (state, action) => {
      setShowsSortValues(state, action)
    },
    sortShowsTenToOne: (state, action) => {
      setShowsSortValues(state, action)
    },
    filterShowsGenre: (state, action) => {
      setShowsFilterValues(state, action)
    },
    setShowsDefault: (state, action) => {
      state.sortState = action.payload
      state.filterState = action.payload
    },
    setShowsToNull: state => {
      state.shows = []
      state.sortedShows = []
      state.totalPages = 0
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getTvShows.pending, state => {
        state.loading = true
        state.error.isError = false
        state.error.msg = ''
      })
      .addCase(getTvShows.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload.results) {
          state.sortedShows = action.payload.results
          state.shows = action.payload.results
          state.totalPages = action.payload.total_pages
        } else {
          state.sortedShows = action.payload
          state.shows = action.payload
        }
        state.error.isError = false
      })
      .addCase(getTvShows.rejected, state => {
        state.loading = false
        state.error.isError = true
        state.error.msg = 'Failed to fetch shows.'
        state.shows = []
        state.sortedShows = []
        state.totalPages = 0
      })
  }
})

export default tvSlice.reducer
export const {
  resetTvSortState,
  resetShows,
  sortShowsAtoZ,
  sortShowsZtoA,
  sortShowsOneToTen,
  sortShowsTenToOne,
  filterShowsGenre,
  setShowsDefault,
  setShowsToNull
} = tvSlice.actions
