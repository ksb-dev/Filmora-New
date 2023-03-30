import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// APIs
import { APIs } from '../../../APIs/APIs'

const initialState = {
  savedShows: [],
  loading: false,
  error: {
    msg: '',
    isError: false
  },
  user: ''
}

export const setSavedShows = createAsyncThunk(
  'savedShows/setSavedShows',
  async () => {
    //console.log('savedShows')
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
  }
)

export const showSlice = createSlice({
  name: 'savedShows',
  initialState,
  reducers: {
    setTvUserNull: (action, paylod) => {
      state.user = ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(setSavedShows.pending, state => {
        state.loading = true
        state.error.msg = ''
        state.error.isError = false
      })
      .addCase(setSavedShows.fulfilled, (state, action) => {
        state.loading = false
        state.error.msg = ''
        state.error.isError = false
        state.savedShows = action.payload

        state.user = sessionStorage.getItem('name')
      })
      .addCase(setSavedShows.rejected, state => {
        state.savedShows = []
        state.loading = false
        state.error.isError = true
        state.error.msg = 'Failed to fetch Wishlists'

        state.user = ''
      })
  }
})

export const { setTvUserNull } = showSlice.actions
export default showSlice.reducer
