import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

// context
import { useMovieContext } from '../../context/context'

// hooks
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'

// react router dom
import { useParams } from 'react-router-dom'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import SearchModal from '../../components/SearchModal/SearchModal'
import Search from '../../components/Search/Search'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// APIs
import { APIs } from '../../APIs/APIs'

// data
import { iconsData } from '../../data/icons'

const ActorDetail = () => {
  const { id } = useParams()
  const { mode } = useMovieContext()
  const { getActorDetail } = useGetMovieInfo()

  const [actorDetail, setActorDetail] = useState('')
  const [actorDetailLoading, setActorDetailLoading] = useState(true)
  const [actorDetailError, setActorDetailError] = useState('')

  const { imdb_id, name, birthday, place_of_birth, profile_path, biography } =
    actorDetail

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getActorDetail(
      id,
      setActorDetail,
      setActorDetailLoading,
      setActorDetailError
    )
  }, [])

  const humanReadableDate = new Date(birthday).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div
      className={
        'actor__detail ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <Search />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <div className='actor__detail__inner'>
        {actorDetailLoading && (
          <span className='actor__detail__inner__loading'>
            <Loading />
          </span>
        )}

        {!actorDetailLoading && actorDetailError && (
          <span className='actor__detail__inner__error'>
            <Error msg={'No details found!'} />
          </span>
        )}

        {!actorDetailLoading && !actorDetailError && (
          <>
            <div className='actor__detail__inner__img-name-birth-place'>
              <div
                className={
                  'actor__detail__inner__img-name-birth-place--image ' +
                  (mode === true ? 'lightBg1' : 'darkBg2')
                }
              >
                {profile_path === null ? (
                  <span className='img-icon-1 '>{iconsData.imageIcon}</span>
                ) : (
                  <img
                    className='img-1'
                    src={APIs.img_path_w342 + profile_path}
                    alt='img'
                    load='lazy'
                  />
                )}

                {profile_path === null ? (
                  <span
                    className={
                      'img-icon-2 ' + (mode === true ? 'lightBg2' : 'darkBg1')
                    }
                  >
                    {iconsData.imageIcon}
                  </span>
                ) : (
                  <img
                    className='img-2'
                    src={APIs.img_path_w342 + profile_path}
                    alt='img'
                    load='lazy'
                  />
                )}
              </div>

              <div className='actor__detail__inner__img-name-birth-place__detail'>
                <span className='name'>{name && name}</span>
                {birthday && (
                  <>
                    <span className='tag'>Born</span>
                    <span className='birth'>{humanReadableDate}</span>
                  </>
                )}
                {place_of_birth && (
                  <>
                    <span className='tag'>Birth-Place</span>
                    <span className='place'>{place_of_birth}</span>
                  </>
                )}
              </div>
            </div>

            <div className='actor__detail__inner__bio'>
              <h3>Biography</h3>
              <span>
                {biography ? biography : <span>No details found.</span>}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ActorDetail
