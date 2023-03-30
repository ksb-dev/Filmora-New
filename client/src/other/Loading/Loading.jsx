import React from 'react'

// context
import { useMovieContext } from '../../context/context'

const Loading = () => {
  const { mode } = useMovieContext()

  return (
    <div
      className={'loader ' + (mode === true ? 'darkLoading' : 'lightLoading')}
    ></div>
  )
}

export default Loading
