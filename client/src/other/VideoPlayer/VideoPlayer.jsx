import React from 'react'

const VideoPlayer = ({ embedId }) => {
  //console.log(embedId)

  return (
    <iframe
      className='frame'
      //loading='lazy'
      width='100%'
      height='100%'
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      title='Embedded youtube'
    />
  )
}

export default VideoPlayer
