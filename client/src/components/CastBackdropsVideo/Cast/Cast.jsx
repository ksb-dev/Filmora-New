import React from 'react'

// Context
import { useMovieContext } from '../../../context/context'

// Components
import Actor from './Actor/Actor'

// Sub-Components
import Loading from '../../../other/Loading/Loading'
import Error from '../../../other/Error/Error'

const Cast = () => {
  const { mode, cast, castLoading, castError } = useMovieContext()

  if (castLoading) {
    return (
      <div className='load'>
        <Loading />
      </div>
    )
  }

  if (castError) {
    return (
      <div className='err'>
        <Error msg={'No cast found.'} />
      </div>
    )
  }

  if (cast && cast.length === 0) {
    return (
      <div className='err'>
        <Error msg={'No cast found.'} />
      </div>
    )
  }

  return (
    <div
      className={'cast scroll-2 ' + (mode === true ? 'lightBg1' : 'darkBg2')}
    >
      {cast &&
        cast.map(
          (actor, index) => index < 6 && <Actor key={index} actor={actor} />
        )}
    </div>
  )
}

export default Cast
