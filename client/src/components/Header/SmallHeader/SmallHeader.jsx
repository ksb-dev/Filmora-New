import React, { useState, useEffect, useRef } from 'react'

// Recat router dom
import { useNavigate } from 'react-router-dom'

// data
import { iconsData } from '../../../data/icons'

// context
import { useMovieContext } from '../../../context/context'

// react router dom
import { Link } from 'react-router-dom'

const SmallHeader = () => {
  const {
    mode,
    setMode,
    setIndex,
    movieState,
    setMovieState,
    setOptionState,
    setSearchQuery,
    searchSmallHeaderIconRef,
    menuState
  } = useMovieContext()
  const navigate = useNavigate()

  const smallHeaderRef = useRef(null)

  // const [yOffset, setYOffset] = useState(window.pageYOffset)

  // const handleScroll = () => {
  //   const currentYOffset = window.pageYOffset
  //   if (yOffset < currentYOffset && yOffset > 55) {
  //     smallHeaderRef.current.style.boxShadow = '0px 0 5px #000'
  //   }

  //   if (yOffset > currentYOffset && yOffset > 55) {
  //     smallHeaderRef.current.style.boxShadow = '0px 0 5px #000'
  //   }

  //   if (yOffset > currentYOffset && yOffset < 55) {
  //     smallHeaderRef.current.style.boxShadow = 'unset'
  //   }

  //   setYOffset(currentYOffset)
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [yOffset, mode])

  // Title Click
  const handleTitleClick = () => {
    sessionStorage.setItem('movieState', 'movie')
    setOptionState('movie')
    sessionStorage.removeItem('genreId')
    sessionStorage.removeItem('option')
    sessionStorage.removeItem('searchQuery')
    setSearchQuery('')
    sessionStorage.setItem('page', 1)
    setIndex(0)
    setMovieState(!movieState)

    navigate('/')
  }

  return (
    <div
      ref={smallHeaderRef}
      className={
        'small-header ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div className='small-header__options'>
        <div className='title'>
          <Link
            to='/'
            className='title '
            onClick={() => {
              handleTitleClick()
            }}
          >
            <span>TMDb</span>
          </Link>
        </div>

        <span
          onClick={() => {
            if (mode === true) {
              sessionStorage.setItem('mode', false)
              setMode(false)
            } else {
              sessionStorage.setItem('mode', true)
              setMode(true)
            }
          }}
          className='mode-icon'
        >
          {mode === true ? iconsData.sunIcon : iconsData.moonIcon}
        </span>
      </div>
    </div>
  )
}

export default SmallHeader
