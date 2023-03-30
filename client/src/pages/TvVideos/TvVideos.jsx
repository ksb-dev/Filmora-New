import React, { useEffect, useRef } from 'react'

// react router dom
import { useParams } from 'react-router-dom'

// hooks
import { useGetTvInfo } from '../../hooks/useGetTvInfo'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import Search from '../../components/Search/Search'
import PlayerOne from '../../components/PlayerOne/PlayerOne'
import AllVideos from '../../components/AllVideos/AllVideos'

const TvVideos = () => {
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
  const { getTvInfo, getTvVideos } = useGetTvInfo()

  const playerFourRef = useRef(null)
  const playerFourInnerRef = useRef(null)

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getTvInfo(id, setData, setLoading, setError)

    getTvVideos(id, setVideos, setVideosLoading, setVideosError)
  }, [])

  return (
    <div
      className={
        'tv__videos ' +
        (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <SmallHeader />
      <Menu />
      <Search />

      <PlayerOne
        playerRef={playerFourRef}
        playerInnerRef={playerFourInnerRef}
        playerUrl={playerUrl}
        playerLoading={playerLoading}
        setPlayerUrl={setPlayerUrl}
      />

      <AllVideos
        playerRef={playerFourRef}
        playerInnerRef={playerFourInnerRef}
      />
    </div>
  )
}

export default TvVideos
