import React, { useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { getMovies } from '../../redux/services/movies/getMovies'
import { getTvShows } from '../../redux/services/shows/getTvShows'
import { setSavedMovies } from '../../redux/services/movies/setSavedMovies'
import { setSavedShows } from '../../redux/services/shows/setSavedShows'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import List from '../../components/List/List'
import SearchModal from '../../components/SearchModal/SearchModal'

const Search = () => {
  const { mode, movieState } = useMovieContext()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const searchQuery = sessionStorage.getItem('searchQuery')
    let savedMovieState = sessionStorage.getItem('movieState')

    if (searchQuery && savedMovieState === 'movie') {
      dispatch(getMovies('search'))
    }

    if (searchQuery && savedMovieState === 'tv') {
      dispatch(getTvShows('search'))
    }

    const savedToken = sessionStorage.getItem('token')
    console.log(true)

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      dispatch(setSavedMovies())
      dispatch(setSavedShows())
      console.log(true)
    }
  }, [dispatch, movieState])

  return (
    <div
      className={
        'search ' +
        (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <SmallHeader />
      <Menu />
      <SearchModal />

      {sessionStorage.getItem('movieState') === 'movie' ||
      sessionStorage.getItem('movieState') === null ? (
        <List type='movie' />
      ) : (
        <List type='tv' />
      )}
    </div>
  )
}

export default Search
