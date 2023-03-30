import React, { useState } from 'react'

// context
import { useMovieContext } from '../../context/context'

// APIs
import { APIs } from '../../APIs/APIs'

// React router dom
import { useNavigate } from 'react-router-dom'

// data
import { iconsData } from '../../data/icons'

// redux
import { useSelector } from 'react-redux'

const SearchResults = ({ results }) => {
  const {
    mode,
    searchQuery,
    searchResultsRef,
    setSearchQuery,
    searchOptionState,
    searchModalRef,
    movieIdState,
    setMovieIdState,
    setsearchComponentState
  } = useMovieContext()
  const [windowWidth, setWindowWidth] = useState(0)
  const navigate = useNavigate()

  let loading
  let error

  if (searchOptionState === 'movie') {
    loading = useSelector(state => state.movieResults.loading)
    error = useSelector(state => state.movieResults.error)
  }
  if (searchOptionState === 'tv') {
    loading = useSelector(state => state.tvResults.loading)
    error = useSelector(state => state.tvResults.error)
  }

  return (
    <div
      ref={searchResultsRef}
      className={
        'search__results  ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div className='search__results__inner scroll - 1'>
        <span style={{ marginBottom: '1rem' }}>
          Search results for "{searchQuery}"
        </span>

        {results &&
          results.length > 0 &&
          results.map((result, index) => (
            <div
              onClick={() => {
                setsearchComponentState(false)

                navigate(`/${searchOptionState}/${result.id}`)
              }}
              key={index}
              className={
                'search__results__inner__card ' +
                (mode === true ? 'lightBg1' : 'darkBg2')
              }
            >
              <div
                className={
                  'search__results__inner__card__image ' +
                  (mode === true ? 'lightBg1' : 'darkBg2')
                }
              >
                {result.poster_path === null ? (
                  <span
                    className={
                      'image-icon ' +
                      (mode === true ? 'darkColor1' : 'lightColor1')
                    }
                  >
                    {iconsData.imageIcon}
                  </span>
                ) : (
                  <img
                    className='img'
                    src={APIs.img_path_w185 + result.poster_path}
                    alt='img'
                    load='lazy'
                  />
                )}
              </div>

              <div className='search__results__inner__card__title-date'>
                <span className={mode === true ? 'darkColor1' : 'lightColor1'}>
                  {result.title ? result.title : result.name}
                </span>
                <span>
                  {result.release_date && result.release_date.substring(0, 4)}

                  {result.first_air_date &&
                    result.first_air_date.substring(0, 4)}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SearchResults
