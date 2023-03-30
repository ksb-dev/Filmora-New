import React, { useEffect } from 'react'

// react router dom
import { Link } from 'react-router-dom'

// data
import { iconsData } from '../../data/icons'

// context
import { useMovieContext } from '../../context/context'

// components
import Cast from './Cast/Cast'
import Backdrops from './Backdrops/Backdrops'
import Videos from './Videos/Videos'

// hooks
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'
import { useGetTvInfo } from '../../hooks/useGetTvInfo'

const CastBackdropsVideo = ({ id, type, playerRef, playerInnerRef }) => {
  const {
    mode,
    cast,
    setCast,
    setCastLoading,
    setCastError,
    backdrops,
    setBackdrops,
    setBackdropsLoading,
    setBackdropsError,
    videos,
    setVideos,
    setVideosLoading,
    setVideosError
  } = useMovieContext()
  const { getMovieCast, getMovieBackdrops, getMovieVideos } = useGetMovieInfo()
  const { getTvCast, getTvBackdrops, getTvVideos } = useGetTvInfo()

  let castPath = type === 'movie' ? `/movie/cast/${id}` : `/tv/cast/${id}`
  let backdropPath =
    type === 'movie' ? `/movie/backdrops/${id}` : `/tv/backdrops/${id}`
  let videoPath = type === 'movie' ? `/movie/videos/${id}` : `/tv/videos/${id}`

  useEffect(() => {
    if (type === 'movie') {
      getMovieCast(id, setCast, setCastLoading, setCastError)
      getMovieBackdrops(
        id,
        setBackdrops,
        setBackdropsLoading,
        setBackdropsError
      )
      getMovieVideos(id, setVideos, setVideosLoading, setVideosError)
    } else {
      getTvCast(id, setCast, setCastLoading, setCastError)
      getTvBackdrops(id, setBackdrops, setBackdropsLoading, setBackdropsError)
      getTvVideos(id, setVideos, setVideosLoading, setVideosError)
    }
  }, [id])

  return (
    <div
      className={
        'castBackdropVideo ' +
        (mode === true ? 'lightBg2 darkColor1' : 'darkBg1 lightColor1')
      }
    >
      <div
        className={
          'castBackdropVideo__cast ' + (mode === true ? 'lightBg1' : 'darkBg2')
        }
      >
        {cast && cast.length > 6 ? (
          <Link
            to={castPath}
            className={
              'castBackdropVideo__cast__title-1 ' +
              (mode === true ? 'darkColor1' : 'lightColor1')
            }
          >
            Top Cast
            <p className='length'>
              <span>{cast && cast.length}</span>
            </p>
            <span className='icon'>{iconsData.forwardArrow}</span>
          </Link>
        ) : (
          <div
            className={
              'castBackdropVideo__cast__title-2 ' +
              (mode === true ? 'darkColor1' : 'lightColor1')
            }
          >
            Top Cast
            <p className='length'>
              <span>{cast && cast.length}</span>
            </p>
          </div>
        )}
        <Cast />
      </div>

      <div
        className={
          'castBackdropVideo__backdrops ' +
          (mode === true ? 'lightBg1' : 'darkBg2')
        }
      >
        {backdrops && backdrops.length > 4 ? (
          <Link
            to={backdropPath}
            className={
              'castBackdropVideo__backdrops__title-1 ' +
              (mode === true ? 'darkColor1' : 'lightColor1')
            }
          >
            Backdrops
            <p className='length'>
              <span>{backdrops && backdrops.length}</span>
            </p>
            <span className='icon'>{iconsData.forwardArrow}</span>
          </Link>
        ) : (
          <div
            className={
              'castBackdropVideo__backdrops__title-2 ' +
              (mode === true ? 'darkColor1' : 'lightColor1')
            }
          >
            Backdrops
            <p className='length'>
              <span>{backdrops && backdrops.length}</span>
            </p>
          </div>
        )}
        <Backdrops />
      </div>

      <div
        className={
          'castBackdropVideo__videos ' +
          (mode === true ? 'lightBg1' : 'darkBg2')
        }
      >
        {videos && videos.length > 4 ? (
          <Link
            to={videoPath}
            className={
              'castBackdropVideo__videos__title-1 ' +
              (mode === true ? 'darkColor1' : 'lightColor1')
            }
          >
            Videos
            <p className='length'>
              <span>{videos && videos.length}</span>
            </p>
            <span className='icon'>{iconsData.forwardArrow}</span>
          </Link>
        ) : (
          <div
            className={
              'castBackdropVideo__videos__title-2 ' +
              (mode === true ? 'darkColor1' : 'lightColor1')
            }
          >
            Videos
            <p className='length'>
              <span>{videos && videos.length}</span>
            </p>
          </div>
        )}

        <Videos playerRef={playerRef} playerInnerRef={playerInnerRef} />
      </div>
    </div>
  )
}

export default CastBackdropsVideo
