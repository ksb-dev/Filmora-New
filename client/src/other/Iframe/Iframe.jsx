import React from 'react'

const Iframe = ({ embedId }) => {
  //console.log(embedId)

  return (
    <iframe
      className='iframe'
      //loading='lazy'
      width='100%'
      height='100%'
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      title='Embedded youtube'
      loading='lazy'
    />
  )
}

export default Iframe
