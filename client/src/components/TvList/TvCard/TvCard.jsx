import React, { useRef } from 'react'
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

// data
import { iconsData } from '../../../data/icons'

// Hooks
import { useWatchlistOperations } from '../../../hooks/useWatchlistOperations'
import { useGetClassByVote } from '../../../hooks/useGetClassByVote'

// Redux
import { useSelector } from 'react-redux'

// Recat Router
import { Link, useNavigate } from 'react-router-dom'

// Context
import { useMovieContext } from '../../../context/context'

// APIs
import { APIs } from '../../../APIs/APIs'

// Circular progress bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const TvCard = ({ tv }) => {
  const { mode } = useMovieContext()
  const { addShow, deleteShow } = useWatchlistOperations()
  const { getClassBg } = useGetClassByVote()

  const user = useSelector(state => state.savedShows.user)
  const savedShows = useSelector(state => state.savedShows.savedShows)

  const navigate = useNavigate()

  const infoRef = useRef(null)
  const infoInnerRef = useRef(null)

  const {
    name,
    vote_average,
    first_air_date,
    poster_path,
    backdrop_path,
    id,
    genre_ids,
    overview
  } = tv

  const show = () => {
    infoRef.current.style.opacity = '1'
    setTimeout(() => {
      infoInnerRef.current.style.opacity = '1'
    }, 100)
  }

  const hide = () => {
    infoRef.current.style.opacity = '0'
    setTimeout(() => {
      infoInnerRef.current.style.opacity = '0'
    }, 100)
  }

  return (
    <div className='card'>
      <div
        className={'card--image ' + (mode === true ? 'lightBg2' : 'darkBg1')}
      >
        <img
          className='img-1'
          src={poster_path === null ? url : APIs.img_path_w780 + backdrop_path}
          alt={name}
          load='lazy'
        />

        <img
          className='img-2'
          src={poster_path === null ? url : APIs.img_path_w342 + poster_path}
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
            poster_path === null ? url : APIs.img_path_w342 + poster_path
          }
          src={poster_path === null ? url : APIs.img_path_w342 + poster_path}
        /> */}
      </div>

      {user && savedShows && savedShows.length === 0 && (
        <p
          className='card__add__btn '
          onClick={() =>
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
        >
          <span className='card__btn--icon'>{iconsData.addBookmark}</span>
        </p>
      )}
      {/* ADD-BUTTON */}
      {user &&
        savedShows &&
        savedShows.length > 0 &&
        savedShows.every((item, index) => item.id !== id) && (
          <p
            key={id}
            className='card__add__btn '
            onClick={() =>
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
          >
            <span className='card__btn--icon'>{iconsData.addBookmark}</span>
          </p>
        )}
      {/* DELETE-BUTTON */}
      {user &&
        savedShows &&
        savedShows.length > 0 &&
        savedShows.map((item, index) => {
          if (item.id === id) {
            return (
              <p
                key={index}
                className='card__delete__btn '
                onClick={() => deleteShow(id)}
                style={{ background: 'gold' }}
              >
                <span className='card__btn--icon' style={{ color: '#000' }}>
                  {iconsData.addedBookmark}
                </span>
              </p>
            )
          }
        })}

      {/* ADD-BUTTON (without user) */}
      {!user && (
        <p className='card__btn ' onClick={() => navigate('/login')}>
          <span className='card__btn--icon'>{iconsData.addBookmark}</span>
        </p>
      )}

      <div className={'card__rating ' + getClassBg(vote_average)}>
        <CircularProgressbar
          value={vote_average * 10}
          strokeWidth={5}
          styles={buildStyles({
            pathColor: '#fff'
          })}
        />
        <span>{Number(String(vote_average).substring(0, 3))}</span>
      </div>

      <div
        ref={infoRef}
        className={
          'card__info ' +
          (mode === true ? 'lightAlpha5 darkColor1' : 'darkAlpha5 lightColor1')
        }
        onMouseOver={show}
        onMouseLeave={hide}
      >
        <div ref={infoInnerRef} className='card__info__inner'>
          <p className='card__info__inner--title'>
            {name && name.length <= 35 ? name : name.substring(0, 32) + '...'}
          </p>

          <span className='card__info__inner--date'>
            {first_air_date && moment(first_air_date).format('Do MMM, YYYY')}
          </span>

          <Link to={`/tv/${id}`} className='card__info__inner--more'>
            <span>{iconsData.forward}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TvCard
