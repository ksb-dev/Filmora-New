import React, { useEffect, useRef } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { getMovies, resetMovies } from '../../redux/services/movies/getMovies'
import { getTvShows, resetShows } from '../../redux/services/shows/getTvShows'
import { setSavedMovies } from '../../redux/services/movies/setSavedMovies'
import { setSavedShows } from '../../redux/services/shows/setSavedShows'

// context
import { useMovieContext } from '../../context/context'
import { useSortFilter } from '../../hooks/useSortFilter'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import List from '../../components/List/List'
import SearchModal from '../../components/SearchModal/SearchModal'
import Search from '../../components/Search/Search'
import PlayerOne from '../../components/PlayerOne/PlayerOne'

const Watchlist = () => {
  const { mode, movieState, setSearchQuery, setIndex, rate, setRate } =
    useMovieContext()
  const dispatch = useDispatch()
  const { sortMovies, sortShows } = useSortFilter()

  const playerWatchlistRef = useRef(null)
  const playerWatchlistInnerRef = useRef(null)

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    setIndex(0)

    sessionStorage.removeItem('searchQuery')
    setSearchQuery('')

    // Check for movie state
    let savedMovieState = sessionStorage.getItem('movieState')

    if (savedMovieState === 'movie') {
      sortMovies(0, rate, setRate)
    } else {
      sortShows(0, rate, setRate)
    }

    // Check for token
    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      dispatch(setSavedMovies())
      dispatch(setSavedShows())

      if (savedMovieState === 'movie') {
        sessionStorage.getItem('token') && dispatch(getMovies('savedMovies'))
      } else {
        sessionStorage.getItem('token') && dispatch(getTvShows('savedShows'))
      }
    }
  }, [dispatch, movieState])

  return (
    <div
      className={
        'home ' + (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <Search />
      <SmallHeader />
      <Menu />
      <SearchModal />

      {sessionStorage.getItem('movieState') === 'movie' ||
      sessionStorage.getItem('movieState') === null ? (
        <List
          type={'movie'}
          playerRef={playerWatchlistRef}
          playerInnerRef={playerWatchlistInnerRef}
        />
      ) : (
        <List
          type={'tv'}
          playerRef={playerWatchlistRef}
          playerInnerRef={playerWatchlistInnerRef}
        />
      )}

      <PlayerOne
        playerRef={playerWatchlistRef}
        playerInnerRef={playerWatchlistInnerRef}
      />
    </div>
  )
}

export default Watchlist
