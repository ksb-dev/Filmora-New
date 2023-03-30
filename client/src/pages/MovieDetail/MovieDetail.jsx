import React, { useState, useEffect, useRef } from 'react'

// React Router
import { useParams } from 'react-router-dom'

// Redux
import { useDispatch } from 'react-redux'
import {
  setSavedMovies,
  setMovieUserNull
} from '../../redux/services/movies/setSavedMovies'
import {
  setSavedShows,
  setTvUserNull
} from '../../redux/services/shows/setSavedShows'

// Context
import { useMovieContext } from '../../context/context'

// Components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import SearchModal from '../../components/SearchModal/SearchModal'

import ImageDetail from '../../components/ImageDetail/ImageDetail'
import CastBackdropsVideo from '../../components/CastBackdropsVideo/CastBackdropsVideo'
import Reviews from '../../components/Reviews/Reviews'
import PlayerOne from '../../components/PlayerOne/PlayerOne'
import ImageViewer from '../../components/ImageViewer/ImageViewer'
import Search from '../../components/Search/Search'

const MovieDetail = () => {
  const { mode, movieState, loading, error } = useMovieContext()
  const dispatch = useDispatch()

  // Movie info
  const { id } = useParams()

  const playerOneRef = useRef(null)
  const playerOneInnerRef = useRef(null)

  const [type, setType] = useState('movie')

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [id])

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      dispatch(setSavedMovies())
      dispatch(setSavedShows())
    } else {
      dispatch(setMovieUserNull())
      dispatch(setTvUserNull())
    }
  }, [dispatch, movieState])

  return (
    <div className={'movie-detail ' + (mode === true ? 'lightBg1' : 'darkBg2')}>
      <Header />
      <Search />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <ImageDetail
        id={id}
        type={type}
        playerRef={playerOneRef}
        playerInnerRef={playerOneInnerRef}
      />

      <PlayerOne playerRef={playerOneRef} playerInnerRef={playerOneInnerRef} />

      {!loading && !error && (
        <>
          <CastBackdropsVideo
            id={id}
            type={type}
            playerRef={playerOneRef}
            playerInnerRef={playerOneInnerRef}
          />

          <Reviews type={type} id={id} />

          <ImageViewer />
        </>
      )}
    </div>
  )
}

export default MovieDetail
