import React from 'react'

// context
import { useMovieContext } from '../..//context/context'

// hooks
import { useShowHide } from '../../hooks/useShowHide'
import { useGetMovieInfo } from '../..//hooks/useGetMovieInfo'
import { useGetTvInfo } from '../../hooks/useGetTvInfo'

const Video = ({
  video,
  setPlayerUrl,
  setPlayerLoading,
  playerRef,
  playerInnerRef
}) => {
  const { mode } = useMovieContext()
  const { showPlayer } = useShowHide()
  const { getMovieTrailer786px } = useGetMovieInfo()
  const { getTvTrailer786px } = useGetTvInfo()

  const playTrailer = () => {
    setPlayerUrl(video.key)
    setPlayerLoading(false)
    showPlayer(playerRef, playerInnerRef)
  }

  return (
    <div className={'video__card ' + (mode === true ? 'lightBg1' : 'darkBg2')}>
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        loading='lazy'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
      />
      <div className='cover' onClick={() => playTrailer()}></div>
    </div>
  )
}

export default Video
