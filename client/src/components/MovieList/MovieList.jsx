import React, { useState, useRef } from 'react'

// Hooks
import { useGetClassByVote } from '../../hooks/useGetClassByVote'

// APIs
import { APIs } from '../../APIs/APIs'

// React Router
import { Link } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// Context
import { useMovieContext } from '../../context/context'

// components
import MovieCard from './MovieCard/MovieCard'
import Pagination from './Pagination/Pagination'
import Sort from './Sort/Sort'
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// Rect Icons
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos
} from 'react-icons/md'

// other
import Switch from '../../other/Switch/Switch'

const MovieList = () => {
  const { mode, index, setIndex } = useMovieContext()
  const { getClassBg } = useGetClassByVote()
  const movies = useSelector(state => state.movies.movies)
  const sortedMovies = useSelector(state => state.movies.sortedMovies)
  const loading = useSelector(state => state.movies.loading)
  const error = useSelector(state => state.movies.error)
  const user = useSelector(state => state.savedMovies.user)

  const buttonsRef = useRef(null)

  const [stop, setStop] = useState(0)
  const timeoutRef = useRef(null)

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIndex(prevIndex =>
  //       prevIndex === sortedMovies.length - 1 ? 0 : prevIndex + 1
  //     )
  //   }, 2000)

  //   if (stop === 1) {
  //     clearTimeout(timer)
  //   }

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [index, stop])

  if (loading) {
    return (
      <div className='loading'>
        <Loading />
      </div>
    )
  }

  if (user && window.location.pathname === '/watchlist' && error.isError) {
    return (
      <div className='error'>
        <Error msg={error.msg} />
      </div>
    )
  }

  if (
    user &&
    window.location.pathname === '/watchlist' &&
    movies &&
    movies.length === 0 &&
    sortedMovies &&
    sortedMovies.length === 0
  ) {
    return (
      <div className='error'>
        <Error msg={'Add movies to watchlist'} />
      </div>
    )
  }

  if (!user && window.location.pathname === '/watchlist') {
    return (
      <div className='error'>
        <Error msg={'Login to see your watchlist'} />
      </div>
    )
  }

  if (error.isError) {
    return (
      <div className='error'>
        <Error msg={error.msg} />
      </div>
    )
  }

  if (!loading && sortedMovies && sortedMovies.length === 0) {
    return (
      <div className='error'>
        <Error msg={'No movies found!'} />
      </div>
    )
  }

  const previousImage = () => {
    index < 1
      ? setIndex(sortedMovies.length - 1)
      : setIndex(prevIndex => prevIndex - 1)
  }

  const nextImage = () => {
    index === sortedMovies.length - 1
      ? setIndex(0)
      : setIndex(prevIndex => prevIndex + 1)
  }

  return (
    <div className='list'>
      {sortedMovies && sortedMovies.length > 0 && (
        <>
          <div
            className={'list__wall ' + (mode === true ? 'lightBg2' : 'darkBg2')}
          >
            <img
              className='list__wall--image-1'
              src={
                sortedMovies[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path + sortedMovies[index].backdrop_path
              }
              alt={sortedMovies[index].title}
              load='lazy'
            />

            <img
              className='list__wall--image-2'
              src={
                sortedMovies[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path_w780 + sortedMovies[index].backdrop_path
              }
              alt={sortedMovies[index].title}
              load='lazy'
            />

            <img
              className='list__wall--image-3'
              src={
                sortedMovies[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path_w780 + sortedMovies[index].backdrop_path
              }
              alt={sortedMovies[index].title}
              load='lazy'
            />

            <Link
              to={`/movie/${sortedMovies[index].id}`}
              className={
                'list__wall__cover ' +
                (mode === true
                  ? 'lightGradient1 darkColor2'
                  : 'darkGradient1 lightColor1')
              }
              onMouseOver={() => {
                //clearTimeout(timeoutRef.current)
                //setStop(1)
                buttonsRef.current.style.zIndex = '1'
              }}
              onMouseLeave={() => {
                //setStop(0)
                buttonsRef.current.style.zIndex = '-1'
              }}
            >
              <p className={'list__wall__cover--number '}>
                {index + 1 + ' / ' + sortedMovies.length}
              </p>

              <div className='list__wall__cover__info'>
                <div className='list__wall__cover__info__rating-title'>
                  {sortedMovies.length > 0 && (
                    <>
                      <p
                        className={
                          'rating ' +
                          getClassBg(sortedMovies[index].vote_average)
                        }
                      >
                        <span>
                          {sortedMovies[index].vote_average.toFixed(1)}
                        </span>
                      </p>
                      <span className='title'>{sortedMovies[index].title}</span>
                    </>
                  )}
                </div>

                <p className='list__wall__cover__info--overview'>
                  {sortedMovies[index].overview ? (
                    sortedMovies[index].overview.length > 245 ? (
                      sortedMovies[index].overview.substring(0, 248) + ' .....'
                    ) : (
                      sortedMovies[index].overview
                    )
                  ) : (
                    <></>
                  )}
                </p>
              </div>
            </Link>

            <div
              ref={buttonsRef}
              className='list__wall__buttons'
              onMouseOver={() => {
                buttonsRef.current.style.zIndex = '1'
              }}
            >
              {sortedMovies.length > 1 ? (
                <>
                  <span>
                    <MdOutlineArrowBackIosNew
                      cursor={'pointer'}
                      style={{
                        marginLeft: '1rem',
                        color: '#fff',
                        background: 'rgba(0, 0, 0, 0.8)',
                        padding: '0.5rem',
                        borderRadius: '50%'
                      }}
                      onClick={() => previousImage(-1)}
                    />
                  </span>
                  <span>
                    <MdOutlineArrowForwardIos
                      cursor={'pointer'}
                      style={{
                        marginRight: '1rem',
                        color: '#fff',
                        background: 'rgba(0, 0, 0, 0.8)',
                        padding: '0.5rem',
                        borderRadius: '50%'
                      }}
                      onClick={() => nextImage(1)}
                    />
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}

      <div className='list__sort-activeOption'>
        {sortedMovies && sortedMovies.length > 0 && <Sort />}

        <div className='switch'>
          {sortedMovies && sortedMovies.length > 0 && <Switch />}
        </div>
      </div>

      <div className='list__movies'>
        {sortedMovies &&
          sortedMovies.length > 0 &&
          sortedMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
      </div>

      {window.location.pathname !== '/watchlist' &&
        sortedMovies &&
        sortedMovies.length > 0 && (
          <div className='pagination'>
            <Pagination data={sortedMovies} pageLimit={5} dataLimit={20} />
          </div>
        )}
    </div>
  )
}

export default MovieList
