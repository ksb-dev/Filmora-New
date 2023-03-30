import React from 'react'

// context
import { useMovieContext } from '../../context/context'

const Error = ({ msg }) => {
  const { mode } = useMovieContext()

  return (
    <div
      className={'err-msg ' + (mode === true ? 'darkColor2' : 'lightColor1')}
    >
      {msg}
    </div>
  )
}

export default Error
