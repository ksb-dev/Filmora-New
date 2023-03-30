import { useState } from 'react'
import axios from 'axios'

// APIs
import { APIs } from '../APIs/APIs'

// Redux
import { useDispatch } from 'react-redux'
import { getMovies } from '../redux/services/movies/getMovies'
import { setSavedMovies } from '../redux/services/movies/setSavedMovies'
import { getTvShows } from '../redux/services/shows/getTvShows'
import { setSavedShows } from '../redux/services/shows/setSavedShows'

export const useWatchlistOperations = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const dispatch = useDispatch()

  // Add movie
  const addMovie = async (
    id,
    title,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    genre_ids,
    overview
  ) => {
    const token = sessionStorage.getItem('token')

    setError(null)
    setIsPending(true)

    try {
      const response = await axios.post(
        APIs.add_movie_url,
        {
          movie_data: {
            id,
            type: 'movie',
            title,
            poster_path,
            backdrop_path,
            vote_average,
            release_date,
            genre_ids,
            overview
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setError(null)
        setIsPending(false)

        dispatch(setSavedMovies())
      }
    } catch (error) {
      setIsPending(false)
      setError('Failed to add to watchlist.')
    }
  }

  // Delete movie
  const deleteMovie = async id => {
    const token = sessionStorage.getItem('token')

    setError(null)
    setIsPending(true)

    try {
      const response = await axios.delete(
        APIs.delete_movie_url + `${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setError(null)
        setIsPending(false)

        dispatch(setSavedMovies())

        if (window.location.pathname === '/watchlist') {
          dispatch(getMovies('watchlist'))
        }
      }
    } catch (error) {
      setIsPending(false)
      setError('Failed to delete to wishlist.')
    }
  }

  // Add movie
  const addShow = async (
    id,
    name,
    poster_path,
    backdrop_path,
    first_air_date,
    vote_average,
    genre_ids,
    overview
  ) => {
    const token = sessionStorage.getItem('token')

    setError(null)
    setIsPending(true)

    try {
      const response = await axios.post(
        APIs.add_show_url,
        {
          show_data: {
            id,
            type: 'tv',
            name,
            poster_path,
            backdrop_path,
            first_air_date,
            vote_average,
            genre_ids,
            overview
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setError(null)
        setIsPending(false)

        dispatch(setSavedShows())
      }
    } catch (error) {
      console.log(error)
      setIsPending(false)
      setError('Failed to add to watchlist.')
    }
  }

  // Delete movie
  const deleteShow = async id => {
    const token = sessionStorage.getItem('token')

    setError(null)
    setIsPending(true)

    try {
      const response = await axios.delete(
        APIs.delete_show_url + `${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setError(null)
        setIsPending(false)

        dispatch(setSavedShows())

        if (window.location.pathname === '/watchlist') {
          dispatch(getTvShows('watchlist'))
        }
      }
    } catch (error) {
      setIsPending(false)
      setError('Failed to delete to wishlist.')
    }
  }

  return { addMovie, deleteMovie, addShow, deleteShow, isPending, error }
}
