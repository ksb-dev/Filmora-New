import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

// react router dom
import { useNavigate } from 'react-router-dom'

// APIs
import { APIs } from '../../APIs/APIs'

// context
import { useMovieContext } from '../../context/context'

// hooks
import { useWatchlistOperations } from '../../hooks/useWatchlistOperations'
import { useGetClassByVote } from '../../hooks/useGetClassByVote'
import { useShowHide } from '../../hooks/useShowHide'
import { useGetTvInfo } from '../../hooks/useGetTvInfo'

// data
import { genreArray } from '../../data/genreData'

// redux
import { useSelector } from 'react-redux'
import { iconsData } from '../../data/icons'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'
import VideoPlayer from '../../other/VideoPlayer/VideoPlayer'
import CircularProgressBar from '../../other/CircularProgressBar/CircularProgressBar'

const TvInfo = ({
  id,
  data,
  loading,
  error,
  trailerUrl,
  trailerLoading,
  trailerError,
  playerRef,
  playerInnerRef,
  setPlayerUrl,
  setPlayerLoading,
  setPlayerError
}) => {
  const navigate = useNavigate()

  //context
  const { mode } = useMovieContext()

  // hooks
  const { addShow, deleteShow } = useWatchlistOperations()
  const { getClassBg } = useGetClassByVote()
  const { showPlayer } = useShowHide()
  const { getTvTrailer786px } = useGetTvInfo()

  // states
  const [genres, setGenres] = useState(new Set())
  const [genre_ids, setGenre_ids] = useState(new Set())

  // redux state
  const savedShows = useSelector(state => state.savedShows.savedShows)
  const user = useSelector(state => state.savedShows.user)

  // Get & store genre__ids
  useEffect(() => {
    if (data && data.genres) {
      for (let i = 0; i < data.genres.length; i++) {
        setGenre_ids(prevId => new Set([...prevId, data.genres[i].id]))
      }

      for (let i = 0; i < data.genres.length; i++) {
        for (let j = 0; j < genreArray.length; j++) {
          if (data.genres[i].name === genreArray[j].genre) {
            setGenres(prevGenre => new Set([...prevGenre, genreArray[j]]))
          }
        }
      }
    }
  }, [data])

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
        <Error msg={'Failed to fetch movie information'} />
      </div>
    )
  }

  const {
    name,
    vote_average,
    poster_path,
    backdrop_path,
    first_air_date,
    overview
  } = data

  const playTrailer = () => {
    showPlayer(playerRef, playerInnerRef)
    getTvTrailer786px(id, setPlayerUrl, setPlayerLoading, setPlayerError)
  }

  const handleAddTv = () => {
    addShow(
      id,
      name,
      poster_path,
      backdrop_path,
      first_air_date,
      vote_average,
      genre_ids,
      overview
    )
  }

  const handleDeleteTv = () => {
    deleteShow(id)
  }

  return (
    <div
      className={
        'tv__info ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div
        className={
          'tv__info__detail ' + (mode === true ? 'lightBg1' : 'darkBg2')
        }
      >
        <div className='tv__info__detail__title-tagline'>
          <span className='title'>{name && name}</span>
        </div>

        <div className='tv__info__detail__date-time'>
          {first_air_date && (
            <span className='date'>
              {moment(first_air_date).format('Do MMM, YYYY')}
            </span>
          )}
        </div>
      </div>

      {/* ---------- Image Video ---------- */}
      <div className='tv__info__image__video'>
        <div
          className={
            'tv__info__image__video--image-1 ' +
            (mode === true ? 'lightBg2' : 'darkBg1')
          }
        >
          <img
            className='img'
            src={
              poster_path === null
                ? APIs.no_image_url
                : APIs.img_path + poster_path
            }
            alt={name}
            load='lazy'
          />

          {/* <LazyLoadImage
            className='img'
            alt='image'
            effect='black-and-white'
            placeholderSrc={
              poster_path === null
                ? APIs.no_image_url
                : APIs.img_path_w342 + poster_path
            }
            src={
              poster_path === null
                ? APIs.no_image_url
                : APIs.img_path_w342 + poster_path
            }
          /> */}
        </div>

        <div
          className={
            'tv__info__image__video__rating ' + getClassBg(vote_average)
          }
        >
          <CircularProgressBar vote_average={vote_average} />
        </div>

        {/* ADD-BUTTON */}
        {user && savedShows && savedShows.length === 0 && (
          <p
            className='tv__info__image__video__add__btn'
            onClick={() => handleAddTv()}
          >
            <span className='tv__info__image__video__add__btn-icon'>
              {iconsData.addBookmark1}
            </span>
          </p>
        )}

        {/* ADD-BUTTON */}
        {user &&
          savedShows &&
          savedShows.length > 0 &&
          savedShows.every(item => item.id !== Number(id)) && (
            <p
              key={id}
              className='tv__info__image__video__add__btn'
              onClick={() => handleAddTv()}
            >
              <span className='tv__info__image__video__add__btn-icon'>
                {iconsData.addBookmark1}
              </span>
            </p>
          )}

        {/* DELETE-BUTTON */}
        {user &&
          savedShows &&
          savedShows.length > 0 &&
          savedShows.map((item, index) => {
            if (item.id === Number(id)) {
              return (
                <p
                  key={index}
                  className='tv__info__image__video__delete__btn'
                  onClick={() => handleDeleteTv()}
                  style={{ background: 'gold' }}
                >
                  <span
                    className='tv__info__image__video__delete__btn-icon'
                    style={{ color: '#000' }}
                  >
                    {iconsData.addedBookmark1}
                  </span>
                </p>
              )
            }
          })}

        {/* ADD-BUTTON (without user) */}
        {!user && (
          <p
            className='tv__info__image__video__btn '
            onClick={() => navigate('/login')}
          >
            <span className='tv__info__image__video__btn-icon'>
              {iconsData.addBookmark1}
            </span>
          </p>
        )}
        <div
          className={
            'tv__info__image__video__player ' +
            (mode === true ? 'lightBg2' : 'darkBg1')
          }
        >
          {trailerLoading && <Loading />}
          {trailerError && <Error msg={'No trailer found'} />}
          {!trailerLoading && !trailerError && trailerUrl === '' && (
            <Error msg={'No trailer found'} />
          )}
          {!trailerLoading && !trailerError && trailerUrl !== '' && (
            <VideoPlayer embedId={trailerUrl && trailerUrl} />
          )}
        </div>
      </div>

      {/* ---------- Image Detail ----------*/}
      <div className='tv__info__image__detail'>
        <div
          className={
            'tv__info__image__detail--image-2 ' +
            (mode === true ? 'lightBg2' : 'darkBg1')
          }
        >
          <img
            className='img'
            src={
              poster_path === null
                ? APIs.no_image_url
                : APIs.img_path + poster_path
            }
            alt={name}
            load='lazy'
          />
          {/* <LazyLoadImage
            className='img'
            alt='image'
            effect='black-and-white'
            placeholderSrc={
              poster_path === null
                ? APIs.no_image_url
                : APIs.img_path_w342 + poster_path
            }
            src={
              poster_path === null
                ? APIs.no_image_url
                : APIs.img_path_w342 + poster_path
            } 
          />*/}
        </div>

        <div
          className={
            'tv__info__image__detail--image-3 ' +
            (mode === true ? 'lightBg2' : 'darkBg1')
          }
        >
          <img
            className='img'
            src={
              poster_path === null
                ? APIs.no_image_url
                : APIs.img_path + backdrop_path
            }
            alt={name}
            load='lazy'
          />
          {/* <LazyLoadImage
            width={'100%'}
            height={'100%'}
            className='img'
            alt='image'
            effect='black-and-white'
            placeholderSrc={
              backdrop_path === null
                ? APIs.no_image_url
                : APIs.img_path + backdrop_path
            }
            src={
              backdrop_path === null
                ? APIs.no_image_url
                : APIs.img_path + backdrop_path
            }
          /> */}
        </div>

        <div
          className={
            'movie__info__image__detail--image-4 ' +
            (mode === true ? 'lightBg2' : 'darkBg1')
          }
        >
          <img
            className='img'
            src={
              poster_path === null
                ? APIs.no_image_url
                : APIs.img_path_w780 + backdrop_path
            }
            alt={name}
            load='lazy'
          />

          {/* <LazyLoadImage
            width={'100%'}
            height={'100%'}
            className='img'
            alt='image'
            effect='black-and-white'
            placeholderSrc={
              backdrop_path === null
                ? APIs.no_image_url
                : APIs.img_path + backdrop_path
            }
            src={
              backdrop_path === null
                ? APIs.no_image_url
                : APIs.img_path + backdrop_path
            }
          /> */}
        </div>

        <div
          className={
            'tv__info__image__detail__rating ' + getClassBg(vote_average)
          }
        >
          <CircularProgressBar vote_average={vote_average} />
        </div>

        {/* ADD-BUTTON */}
        {user && savedShows && savedShows.length === 0 && (
          <p
            className='tv__info__image__detail__add__btn'
            onClick={() => handleAddTv()}
          >
            <span className='tv__info__image__detail__add__btn-icon'>
              {iconsData.addBookmark1}
            </span>
          </p>
        )}

        {/* ADD-BUTTON */}
        {user &&
          savedShows &&
          savedShows.length > 0 &&
          savedShows.every(item => item.id !== Number(id)) && (
            <p
              key={id}
              className='tv__info__image__detail__add__btn'
              onClick={() => handleAddTv()}
            >
              <span className='tv__info__image__detail__add__btn-icon'>
                {iconsData.addBookmark1}
              </span>
            </p>
          )}

        {/* DELETE-BUTTON */}
        {user &&
          savedShows &&
          savedShows.length > 0 &&
          savedShows.map((item, index) => {
            if (item.id === Number(id)) {
              return (
                <p
                  key={index}
                  className='tv__info__image__detail__delete__btn'
                  onClick={() => handleDeleteTv()}
                  style={{ background: 'gold' }}
                >
                  <span
                    className='tv__info__image__detail__delete__btn-icon'
                    style={{ color: '#000' }}
                  >
                    {iconsData.addedBookmark1}
                  </span>
                </p>
              )
            }
          })}

        {/* ADD-BUTTON (without user) */}
        {!user && (
          <p
            className='tv__info__image__detail__btn '
            onClick={() => navigate('/login')}
          >
            <span className='tv__info__image__detail__btn-icon'>
              {iconsData.addBookmark1}
            </span>
          </p>
        )}

        {/* Genres */}
        <div className='tv__info__image__detail__inner'>
          <div className='tv__info__image__detail__inner__genres'>
            {genres &&
              Array.from(genres).length > 0 &&
              Array.from(genres).map((genre, index) => (
                <span
                  key={index}
                  className={
                    mode === true ? 'genreDarkBorder' : 'genreLightBorder'
                  }
                >
                  {genre.genre}
                </span>
              ))}
          </div>

          <div className='tv__info__image__detail__inner__overview'>
            <span>{overview && overview}</span>
          </div>

          <span
            className='movie__info__image__detail__inner__playBtn'
            onClick={() => playTrailer()}
          >
            {iconsData.play}
            Watch Trailer
          </span>
        </div>
      </div>
    </div>
  )
}

export default TvInfo
