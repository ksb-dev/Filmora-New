import React from 'react'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

const Switch = () => {
  const {
    setMovieState,
    setIndex,
    movieState,
    mode,
    setMode,
    searchQuery,
    setSearchQuery,
    searchResultsRef,
    optionState,
    setOptionState
  } = useMovieContext()

  const handleOptionState = value => {
    sessionStorage.removeItem('option')

    if (value === 'movie') {
      setOptionState('movie')
      sessionStorage.setItem('movieState', 'movie')
    } else {
      setOptionState('tv')
      sessionStorage.setItem('movieState', 'tv')
    }
    setIndex(0)
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('term', '')
    sessionStorage.removeItem('genreId')
    // if (window.location.pathname !== '/watchlist') {
    //   sessionStorage.removeItem('option')
    // }
    setMovieState(!movieState)

    // else {
    //   if (value === 'movie') {
    //     setOptionState('movie')
    //     sessionStorage.setItem('movieState', 'movie')
    //   } else {
    //     setOptionState('tv')
    //     sessionStorage.setItem('movieState', 'tv')
    //   }
    // }
  }

  return (
    <div className='switch__component'>
      <div className='switch__component__inner'>
        {optionState === 'movie' ? (
          <p>
            <span className='checked'></span> Movie
          </p>
        ) : (
          <p onClick={() => handleOptionState('movie')}>
            <span
              className={
                'notChecked ' +
                (mode === true ? 'darkCheckBorder ' : 'lightCheckBorder')
              }
            ></span>
            Movie
          </p>
        )}

        {optionState === 'tv' ? (
          <p>
            <span className='checked'></span> Tv
          </p>
        ) : (
          <p onClick={() => handleOptionState('tv')}>
            <span
              className={
                'notChecked ' +
                (mode === true ? 'darkCheckBorder ' : 'lightCheckBorder')
              }
            ></span>
            Tv
          </p>
        )}
        {/* {optionState === 'movie' ? (
        <p
          className='switch__component__movie activeSwitch '
          onClick={() => handleOptionState('movie')}
        >
          <span>Movie</span>
        </p>
      ) : (
        <p
          className={
            'switch__component__movie ' +
            (mode === true ? 'lightBg2 darkColor2' : 'darkBg1 lightColor1')
          }
          onClick={() => handleOptionState('movie')}
        >
          <span>Movie</span>
        </p>
      )}

     

      {optionState === 'tv' ? (
        <p
          className='switch__component__tv activeSwitch'
          onClick={() => handleOptionState('tv')}
        >
          <span>Tv</span>
        </p>
      ) : (
        <p
          className={
            'switch__component__tv ' +
            (mode === true ? 'lightBg2 darkColor2' : 'darkBg1 lightColor1')
          }
          onClick={() => handleOptionState('tv')}
        >
          <span>Tv</span>
        </p>
      )} */}
      </div>
    </div>
  )
}

export default Switch
