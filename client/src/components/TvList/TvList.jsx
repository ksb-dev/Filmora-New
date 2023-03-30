import React, { useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

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
import TvCard from './TvCard/TvCard'
import Pagination from './Pagination/Pagination'
import Sort from './Sort/Sort'
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos
} from 'react-icons/md'

// other
import Switch from '../../other/Switch/Switch'

const TvList = () => {
  const { mode, index, setIndex } = useMovieContext()
  const { getClassBg } = useGetClassByVote()
  const shows = useSelector(state => state.tvShows.sortedShows)
  const sortedShows = useSelector(state => state.tvShows.sortedShows)
  const loading = useSelector(state => state.tvShows.loading)
  const error = useSelector(state => state.tvShows.error)
  const user = useSelector(state => state.savedShows.user)

  // const [stop, setStop] = useState(0)
  // const timeoutRef = useRef(null)
  const buttonsRef = useRef(null)

  const previousImage = () => {
    index < 1
      ? setIndex(sortedShows.length - 1)
      : setIndex(prevIndex => prevIndex - 1)
  }

  const nextImage = () => {
    index === sortedShows.length - 1
      ? setIndex(0)
      : setIndex(prevIndex => prevIndex + 1)
  }

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
    shows &&
    shows.length === 0 &&
    sortedShows &&
    sortedShows.length === 0
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

  if (!loading && sortedShows && sortedShows.length === 0) {
    return (
      <div className='error'>
        <Error msg={'No shows found!'} />
      </div>
    )
  }

  return (
    <div className='list'>
      {sortedShows && sortedShows.length > 0 && (
        <>
          <div
            className={'list__wall ' + (mode === true ? 'lightBg2' : 'darkBg2')}
          >
            <img
              className='list__wall--image-1'
              src={
                sortedShows[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path + sortedShows[index].backdrop_path
              }
              alt={sortedShows[index].name}
              load='lazy'
            />

            <img
              className='list__wall--image-2'
              src={
                sortedShows[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path_w780 + sortedShows[index].backdrop_path
              }
              alt={sortedShows[index].name}
              load='lazy'
            />

            <img
              className='list__wall--image-3'
              src={
                sortedShows[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path_w780 + sortedShows[index].backdrop_path
              }
              alt={sortedShows[index].name}
              load='lazy'
            />

            {/* <LazyLoadImage
              width={'100%'}
              height={'100%'}
              className='list__wall--image'
              alt={sortedShows[index].title}
              effect='black-and-white'
              placeholderSrc={
                sortedShows[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path + sortedShows[index].backdrop_path
              }
              src={
                sortedShows[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path + sortedShows[index].backdrop_path
              } 
            />*/}

            <Link
              to={`/tv/${sortedShows[index].id}`}
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
                {index + 1 + ' / ' + sortedShows.length}
              </p>

              <div className='list__wall__cover__info'>
                <div className='list__wall__cover__info__rating-title'>
                  {sortedShows.length > 0 && (
                    <>
                      <p
                        className={
                          'rating ' +
                          getClassBg(sortedShows[index].vote_average)
                        }
                      >
                        <span>
                          {sortedShows[index].vote_average.toFixed(1)}
                        </span>
                      </p>
                      <span className='title'>{sortedShows[index].name}</span>
                    </>
                  )}
                </div>
                <p className='list__wall__cover__info--overview'>
                  {sortedShows[index].overview ? (
                    sortedShows[index].overview.length > 245 ? (
                      sortedShows[index].overview.substring(0, 248) + ' .....'
                    ) : (
                      sortedShows[index].overview
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
              {sortedShows.length > 1 ? (
                <>
                  <span>
                    <MdOutlineArrowBackIosNew
                      cursor={'pointer'}
                      size={'20px'}
                      style={{
                        marginLeft: '1rem',
                        color: '#fff',
                        background: 'rgba(0, 0, 0, 0.8)',
                        padding: '0.5rem',
                        borderRadius: '50%'
                      }}
                      onClick={previousImage}
                    />
                  </span>

                  <span>
                    <MdOutlineArrowForwardIos
                      cursor={'pointer'}
                      size={'20px'}
                      style={{
                        marginRight: '1rem',
                        color: '#fff',
                        background: 'rgba(0, 0, 0, 0.8)',
                        padding: '0.5rem',
                        borderRadius: '50%'
                      }}
                      onClick={nextImage}
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
        {sortedShows && sortedShows.length > 0 && <Sort />}

        <div className='switch'>
          {sortedShows && sortedShows.length > 0 && <Switch />}
        </div>

        {/* {window.location.pathname === '/watchlist' && (
          <span className='activeOption'>Watchlist (Shows)</span>
        )}

        {window.location.pathname !== '/watchlist' &&
          window.location.pathname !== '/search' && (
            <span className='activeOption'>
              {sessionStorage.getItem('option') + ' shows'}
            </span>
          )}

        {window.location.pathname === '/search' && (
          <span className='activeOption'>
            {searchQuery + ' (search results)'}
          </span>
        )} */}
      </div>

      <div className='list__movies'>
        {sortedShows &&
          sortedShows.length > 0 &&
          sortedShows.map((tv, index) => <TvCard key={index} tv={tv} />)}
      </div>

      {window.location.pathname !== '/watchlist' &&
        sortedShows &&
        sortedShows.length > 0 && (
          <div className='pagination'>
            <Pagination data={sortedShows} pageLimit={5} dataLimit={20} />
          </div>
        )}
    </div>
  )
}

export default TvList
