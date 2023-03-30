// Context
import { useMovieContext } from '../../../context/context'

// Components
import Backdrop from './Backdrop/Backdrop'

// Sub-Components
import Loading from '../../../other/Loading/Loading'
import Error from '../../../other/Error/Error'

const Backdrops = () => {
  const { mode, backdrops, backdropsLoading, backdropsError } =
    useMovieContext()

  if (backdropsLoading) {
    return (
      <div className='load'>
        <Loading />
      </div>
    )
  }

  if (backdropsError) {
    return (
      <div className='err'>
        <Error msg={'No backdrops found.'} />
      </div>
    )
  }

  if (backdrops && backdrops.length === 0) {
    return (
      <div className='err'>
        <Error msg={'No backdrops found.'} />
      </div>
    )
  }

  return (
    <div
      className={
        'backdrops scroll-2 ' + (mode === true ? 'lightBg1' : 'darkBg2')
      }
    >
      {backdrops &&
        backdrops.map(
          (backdrop, index) =>
            index < 4 && (
              <Backdrop
                key={backdrop.file_path}
                backdrop={backdrop}
                index={index}
              />
            )
        )}
    </div>
  )
}

export default Backdrops
