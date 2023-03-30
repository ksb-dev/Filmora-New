import React, { useEffect, useRef } from 'react'

// react router dom
import { useParams } from 'react-router-dom'

// hooks
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import Search from '../../components/Search/Search'
import PlayerOne from '../../components/PlayerOne/PlayerOne'
import AllVideos from '../../components/AllVideos/AllVideos'

const MovieVideos = () => {
  const { id } = useParams()
  const {
    mode,
    setData,
    setLoading,
    setError,
    setVideos,
    setVideosLoading,
    setVideosError,
    playerUrl,
    setPlayerUrl,
    playerLoading
  } = useMovieContext()
  const { getMovieInfo, getMovieVideos } = useGetMovieInfo()

  const playerThreeRef = useRef(null)
  const playerThreeInnerRef = useRef(null)

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getMovieInfo(id, setData, setLoading, setError)

    getMovieVideos(id, setVideos, setVideosLoading, setVideosError)
  }, [])

  return (
    <div
      className={
        'movie__videos ' +
        (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <SmallHeader />
      <Menu />
      <Search />

      <PlayerOne
        playerRef={playerThreeRef}
        playerInnerRef={playerThreeInnerRef}
        playerUrl={playerUrl}
        playerLoading={playerLoading}
        setPlayerUrl={setPlayerUrl}
      />

      <AllVideos
        playerRef={playerThreeRef}
        playerInnerRef={playerThreeInnerRef}
      />
    </div>
  )
}

export default MovieVideos
