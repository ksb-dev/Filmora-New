import React, { useState } from 'react'

// Context
import { useMovieContext } from '../../../context/context'

// Components
import Video from '../Videos/Video/Video'

// Sub-Components
import Loading from '../../../other/Loading/Loading'
import Error from '../../../other/Error/Error'

const Videos = ({ playerRef, playerInnerRef }) => {
  const {
    mode,
    videos,
    videosLoading,
    videosError,
    setPlayerUrl,
    setPlayerLoading,
    setPlayerError
  } = useMovieContext()

  if (videosLoading) {
    return (
      <div className='load'>
        <Loading />
      </div>
    )
  }

  if (videosError) {
    return (
      <div className='err'>
        <Error msg={'No videos found.'} />
      </div>
    )
  }

  if (videos && videos.length === 0) {
    return (
      <div className='err'>
        <Error msg={'No videos found.'} />
      </div>
    )
  }

  return (
    <div
      className={'videos scroll-2 ' + (mode === true ? 'lightBg1' : 'darkBg2')}
    >
      {videos &&
        videos.map(
          (video, index) =>
            index < 4 && (
              <Video
                key={index}
                video={video}
                index={index}
                setPlayerUrl={setPlayerUrl}
                setPlayerLoading={setPlayerLoading}
                setPlayerError={setPlayerError}
                playerRef={playerRef}
                playerInnerRef={playerInnerRef}
              />
            )
        )}
    </div>
  )
}

export default Videos
