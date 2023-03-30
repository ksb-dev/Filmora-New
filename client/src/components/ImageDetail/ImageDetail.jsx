import React, { useState, useEffect } from 'react'
import moment from 'moment'

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
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'
import { useGetTvInfo } from '../../hooks/useGetTvInfo'

// data
import { genreArray } from '../../data/genreData'

// redux
import { useSelector } from 'react-redux'
import { iconsData } from '../../data/icons'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'
import CircularProgressBar from '../../other/CircularProgressBar/CircularProgressBar'

const ImageDetail = ({ id, type, playerRef, playerInnerRef }) => {
  const navigate = useNavigate()

  //context
  const {
    mode,
    data,
    setData,
    setLoading,
    loading,
    error,
    setError,
    setPlayerUrl,
    setPlayerLoading,
    setPlayerError
  } = useMovieContext()

  // hooks
  const { addMovie, deleteMovie, addShow, deleteShow } =
    useWatchlistOperations()
  const { getClassBg } = useGetClassByVote()
  const { showPlayer } = useShowHide()
  const { getMovieInfo, getMovieTrailer786px } = useGetMovieInfo()
  const { getTvInfo, getTvTrailer786px } = useGetTvInfo()

  // states
  const [genres, setGenres] = useState(new Set())
  const [genre_ids, setGenre_ids] = useState(new Set())

  // movie / tv
  let watchlist = ''
  let user = ''

  if (type === 'movie') {
    watchlist = useSelector(state => state.savedMovies.savedMovies)
    user = useSelector(state => state.savedMovies.user)
  } else {
    watchlist = useSelector(state => state.savedShows.savedShows)
    user = useSelector(state => state.savedShows.user)
  }

  useEffect(() => {
    type === 'movie'
      ? getMovieInfo(id, setData, setLoading, setError)
      : getTvInfo(id, setData, setLoading, setError)
  }, [id])

  // Get & store genre__ids
  useEffect(() => {
    setGenres(new Set())

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
    title,
    name,
    tagline,
    vote_average,
    poster_path,
    backdrop_path,
    first_air_date,
    release_date,
    runtime,
    overview
  } = data

  const playTrailer = () => {
    showPlayer(playerRef, playerInnerRef)
    type === 'movie'
      ? getMovieTrailer786px(id, setPlayerUrl, setPlayerLoading, setPlayerError)
      : getTvTrailer786px(id, setPlayerUrl, setPlayerLoading, setPlayerError)
  }

  const handleAddMovie = () => {
    type === 'movie'
      ? addMovie(
          id,
          title,
          poster_path,
          backdrop_path,
          release_date,
          vote_average,
          genre_ids,
          overview
        )
      : addShow(
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

  const handleDeleteMovie = () => {
    type === 'movie' ? deleteMovie(id) : deleteShow(id)
  }

  return (
    <div
      className={
        'image__detail ' +
        (mode === true ? 'lightBg2 darkColor1' : 'darkBg1 lightColor1')
      }
      style={{
        backgroundImage: `url(${APIs.img_path + backdrop_path})`,
        //backgroundRepeat: 'no-repeat',
        objectFit: 'fill'
      }}
    >
      <div
        className={
          'image__detail__cover ' +
          (mode === true ? 'lightGradient' : 'darkGradient')
        }
      >
        {/* ---------- One ---------- */}
        <div className='image__detail__cover__one'>
          <span className='title'>
            {type === 'movie' ? title && title : name && name}
          </span>

          <div className='date-time'>
            {type === 'movie' ? (
              release_date && (
                <span className='date'>
                  {iconsData.date}
                  {moment(release_date).format('Do MMM, YYYY')}
                </span>
              )
            ) : (
              <></>
            )}

            {type === 'tv' ? (
              first_air_date && (
                <span className='date'>
                  {iconsData.date}
                  {moment(first_air_date).format('Do MMM, YYYY')}
                </span>
              )
            ) : (
              <></>
            )}

            {runtime && type === 'movie' ? (
              <>
                <span className='gap'>-</span>

                <span className='time'>
                  <>
                    {iconsData.clock}
                    {`${Math.floor(runtime / 60)}` > 0 &&
                      `${Math.floor(runtime / 60)}h`}
                    {` ${runtime % 60}`}m
                  </>
                </span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* ---------- Two ---------- */}
        <div className='image__detail__cover__two'>
          <div className='image__detail__cover__two__image'>
            {poster_path === null ? (
              <span
                className={
                  'img-icon-1 ' + (mode === true ? 'lightBg1' : 'darkBg2')
                }
              >
                {iconsData.imageIcon}
              </span>
            ) : (
              <img
                className={'img-1 ' + (mode === true ? 'lightBg1' : 'darkBg2')}
                src={APIs.img_path_w342 + poster_path}
                alt='img'
                load='lazy'
              />
            )}

            {backdrop_path === null ? (
              <span
                className={
                  'img-icon-2 ' + (mode === true ? 'lightBg1' : 'darkBg2')
                }
              >
                {iconsData.imageIcon}
              </span>
            ) : (
              <img
                className={'img-2 ' + (mode === true ? 'lightBg1' : 'darkBg2')}
                src={APIs.img_path_w780 + backdrop_path}
                alt='img'
                load='lazy'
              />
            )}

            <div className={'rating ' + getClassBg(vote_average)}>
              <CircularProgressBar vote_average={vote_average} />
            </div>

            {user && watchlist && watchlist.length === 0 && (
              <p className='add-btn' onClick={() => handleAddMovie()}>
                <span className='add-btn-icon'>{iconsData.addBookmark1}</span>
              </p>
            )}

            {user &&
              watchlist &&
              watchlist.length > 0 &&
              watchlist.every(item => item.id !== Number(id)) && (
                <p
                  key={id}
                  className='add-btn'
                  onClick={() => handleAddMovie()}
                >
                  <span className='add-btn-icon'>{iconsData.addBookmark1}</span>
                </p>
              )}

            {user &&
              watchlist &&
              watchlist.length > 0 &&
              watchlist.map((item, index) => {
                if (item.id === Number(id)) {
                  return (
                    <p
                      key={index}
                      className='delete-btn'
                      onClick={() => handleDeleteMovie()}
                      style={{ background: 'var(--primary)' }}
                    >
                      <span
                        className='delete-btn-icon'
                        style={{ color: '#fff' }}
                      >
                        {iconsData.addedBookmark1}
                      </span>
                    </p>
                  )
                }
              })}

            {!user && (
              <p className='btn ' onClick={() => navigate('/login')}>
                <span className='btn-icon'>{iconsData.addBookmark1}</span>
              </p>
            )}
          </div>

          <div className='image__detail__cover__two__detail'>
            <div className='title-tagline'>
              {type === 'movie' && title && (
                <span className='title-1'>{title}</span>
              )}

              {type === 'tv' && name && <span className='title-2'>{name}</span>}

              {type === 'movie' && tagline && (
                <span className='tagline'>
                  {iconsData.LeftQuote}
                  {' ' + tagline + ' '}
                  {iconsData.RightQuote}
                </span>
              )}
            </div>

            <div className='genres'>
              {genres &&
                Array.from(genres).length > 0 &&
                Array.from(genres).map((genre, index) => (
                  <span key={index}>
                    {genre.icon1}
                    {genre.genre}
                  </span>
                ))}
            </div>

            <div className='overview'>
              <span className='title'>Overview</span>
              <span>{overview && overview}</span>
            </div>

            <div className='date-time'>
              {type === 'movie' ? (
                release_date && (
                  <span className='date'>
                    {iconsData.date}
                    {moment(release_date).format('Do MMM, YYYY')}
                  </span>
                )
              ) : (
                <></>
              )}

              {type === 'tv' ? (
                first_air_date && (
                  <span className='date'>
                    {iconsData.date}
                    {moment(first_air_date).format('Do MMM, YYYY')}
                  </span>
                )
              ) : (
                <></>
              )}

              {runtime && type === 'movie' ? (
                <>
                  <span className='gap'>-</span>

                  <span className='time'>
                    <>
                      {iconsData.clock}
                      {`${Math.floor(runtime / 60)}` > 0 &&
                        `${Math.floor(runtime / 60)}h`}
                      {` ${runtime % 60}`}m
                    </>
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>

            <span className='play-btn-1' onClick={() => playTrailer()}>
              {iconsData.play} Watch Trailer
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageDetail
