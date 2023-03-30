import React from 'react'

// hooks
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'

// APIs
import { APIs } from '../../APIs/APIs'

// context
import { useMovieContext } from '../../context/context'

// components
import BackdropCard from '../../components/BackdropCard/BackdropCard'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// data
import { iconsData } from '../../data/icons'

const AllBackdrops = () => {
  const {
    mode,
    data,
    loading,
    error,
    backdrops,
    backdropsError,
    backdropsLoading
  } = useMovieContext()

  if (loading) {
    return (
      <div className='loading'>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className='error'>
        <Error msg={'Failed to fetch backdrops'} />
      </div>
    )
  }

  return (
    <>
      {!loading && !error && (
        <div className='all__backdrops'>
          <div className='all__backdrops__detail'>
            <div className='all__backdrops__detail__image'>
              {data.backdrop_path === null ? (
                <span
                  className={
                    'img-icon ' + (mode === true ? 'lightBg2' : 'darkBg1')
                  }
                >
                  {iconsData.imageIcon}
                </span>
              ) : (
                <img
                  className='img'
                  src={APIs.img_path + data.backdrop_path}
                  alt='img'
                  load='lazy'
                />
              )}

              <div
                className={
                  'all__backdrops__detail__image__cover ' +
                  (mode === true ? 'lightCoverGradient' : 'darkCoverGradient')
                }
              >
                <span
                  className={
                    'all__backdrops__detail__image__cover--title ' +
                    (mode === true ? 'darkColor1' : 'lightColor1')
                  }
                >
                  {data.title ? data.title : data.name}
                </span>
              </div>
            </div>
          </div>

          <div className='all__backdrops__container'>
            <div
              className={
                'all__backdrops__container--title ' +
                (mode === true ? 'darkColor1' : 'lightColor1')
              }
            >
              <span className='title'>All Backdrops</span>
              <p className='length'>
                <span>{backdrops && backdrops.length}</span>
              </p>
            </div>

            {backdropsLoading && (
              <span className='backdrops-loading'>
                <Loading />
              </span>
            )}

            {backdropsError && (
              <span className='backdrops-loading'>
                <Error msg={'No backdrops found.'} />
              </span>
            )}

            <div className='all__backdrops__container__backdrops'>
              {backdrops &&
                backdrops.map((backdrop, index) => (
                  <BackdropCard key={index} backdrop={backdrop} index={index} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AllBackdrops
