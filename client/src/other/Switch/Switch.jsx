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
            <span className='checked lightBg1'></span> Movie
          </p>
        ) : (
          <p onClick={() => handleOptionState('movie')}>
            <span className='notChecked lightCheckBorder'></span>
            Movie
          </p>
        )}

        {optionState === 'tv' ? (
          <p>
            <span className='checked lightBg1'></span> Tv
          </p>
        ) : (
          <p onClick={() => handleOptionState('tv')}>
            <span className='notChecked lightCheckBorder'></span>
            Tv
          </p>
        )}
      </div>
    </div>
  )
}

export default Switch
