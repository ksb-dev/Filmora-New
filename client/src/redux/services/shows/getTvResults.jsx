import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// APIs
import { APIs } from '../../../APIs/APIs'

const initialState = {
  tvResults: [],
  loading: false,
  error: {
    msg: '',
    isError: false
  }
}

export const getTvResults = createAsyncThunk(
  'movieResults/getMovieResults',

  async value => {
    var data, res

    if (value !== null) {
      data = await fetch(APIs.search__tv__url + `&query=${value}`)
    }

    // const page = sessionStorage.getItem('page')

    // if (value !== null && page === 1) {
    //   data = await fetch(APIs.search__tv__url + `&query=${value}`)
    // } else {
    //   data = await fetch(APIs.search__tv__url + `&query=${value}&page=${page}`)
    // }

    res = await data.json()

    return res
  }
)

export const tvResultsSlice = createSlice({
  name: 'tvResults',
  initialState,
  reducers: {
    setTvResultsToZero: state => {
      state.tvResults = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getTvResults.pending, state => {
        state.loading = true
        state.error.isError = false
        state.error.msg = ''
      })
      .addCase(getTvResults.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload.results) {
          state.tvResults = action.payload.results
        } else {
          state.tvResults = action.payload
        }
        state.error.isError = false
      })
      .addCase(getTvResults.rejected, state => {
        console.log('rejected')
        state.loading = false
        state.error.isError = true
        state.error.msg = 'Failed to fetch shows.'
        state.tvResults = []
      })
  }
})

export default tvResultsSlice.reducer
export const { setTvResultsToZero } = tvResultsSlice.actions
