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

// Hooks
import { useGetTvInfo } from '../../hooks/useGetTvInfo'

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

const TvDetail = () => {
  const { mode, movieState, loading, error } = useMovieContext()
  const dispatch = useDispatch()

  // Movie info
  const { id } = useParams()

  const playerTwoRef = useRef(null)
  const playerTwoInnerRef = useRef(null)

  const [type, setType] = useState('tv')

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
    <div className={'tv-detail ' + (mode === true ? 'lightBg1' : 'darkBg2')}>
      <Header />
      <Search />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <ImageDetail
        id={id}
        type={type}
        playerRef={playerTwoRef}
        playerInnerRef={playerTwoInnerRef}
      />

      <PlayerOne playerRef={playerTwoRef} playerInnerRef={playerTwoInnerRef} />

      {!loading && !error && (
        <>
          <CastBackdropsVideo
            id={id}
            type={type}
            playerRef={playerTwoRef}
            playerInnerRef={playerTwoInnerRef}
          />

          <Reviews type={type} id={id} />

          <ImageViewer />
        </>
      )}
    </div>
  )
}

export default TvDetail
