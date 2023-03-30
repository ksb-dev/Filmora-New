import React, { useState, useEffect } from 'react'

// redux
import { useSelector } from 'react-redux'

// Recat router dom
import { Link, useNavigate } from 'react-router-dom'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

// components
import Logout from './Logout/Logout'

// other
import MenuIcon from '../../other/MenuIcon/MenuIcon'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

const Header = () => {
  const {
    mode,
    setMode,
    logoutState,
    setLogoutState,
    setIndex,
    movieState,
    setMovieState,
    userIconRef,
    menuIconRef,
    setSearchQuery,
    setOptionState,
    logoutRef,
    headerRef,
    searchHeaderIconRef
  } = useMovieContext()
  const { hideLogout } = useShowHide()

  const user1 = useSelector(state => state.savedMovies.user)
  const user2 = useSelector(state => state.savedShows.user)

  const navigate = useNavigate()

  // const [yOffset, setYOffset] = useState(window.pageYOffset)

  // const handleScroll = () => {
  //   const currentYOffset = window.pageYOffset

  //   if (yOffset < currentYOffset && yOffset > 55) {
  //     headerRef.current.style.boxShadow = '0px 12.5px 10px -15px #000'
  //     //headerRef.current.style.borderBottom = '2px solid var(--primary)'
  //   }

  //   if (yOffset > currentYOffset && yOffset > 55) {
  //     headerRef.current.style.boxShadow = '0px 12.5px 10px -15px #000'
  //     //headerRef.current.style.borderBottom = '2px solid var(--primary)'
  //   }

  //   if (yOffset > currentYOffset && yOffset < 55) {
  //     headerRef.current.style.boxShadow = 'unset'
  //     //headerRef.current.style.borderBottom = 'unset'
  //   }

  //   setYOffset(currentYOffset)
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [yOffset, mode])

  // Window Scroll Function
  window.onscroll = () => {
    scrollFunction()
  }

  const scrollFunction = () => {
    // To close logout component
    if (logoutRef.current !== null) hideLogout(logoutRef)
    setLogoutState(false)
  }

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
      className={
        'header ' +
        (mode === true ? 'lightBg1 darkColor2 ' : 'darkBg2 lightColor1 ')
      }
      ref={headerRef}
    >
      <div className='header__options'>
        {/* One */}
        <div className='header__options__one'>
          <p
            className='title '
            onClick={() => {
              handleTitleClick()
            }}
          >
            TMDb
          </p>

          <div className='header-menu-icon'>
            <MenuIcon menuIconRef={menuIconRef} />
          </div>
        </div>

        {/* Two */}
        <div className='header__options__two'>
          {window.location.pathname === '/' ? (
            <Link to='/' className='home-link activeRoute'>
              <span>{iconsData.homeOutlined}</span> <span>Home</span>
            </Link>
          ) : (
            <Link
              to='/'
              className={
                'home-link ' + (mode === true ? 'darkColor2' : 'lightColor1')
              }
            >
              <span>{iconsData.homeOutlined}</span> <span>Home</span>
            </Link>
          )}

          {window.location.pathname === '/watchlist' ? (
            <Link to='/watchlist' className='watchlist-link activeRoute'>
              <span>{iconsData.outlineBookmark}</span> <span>Watchlist</span>
            </Link>
          ) : (
            <Link
              to='/watchlist'
              className={
                'watchlist-link ' +
                (mode === true ? 'darkColor2' : 'lightColor1')
              }
            >
              <span>{iconsData.outlineBookmark}</span> <span>Watchlist</span>
            </Link>
          )}

          <div ref={userIconRef} className='user'>
            {(user1 && user2) || sessionStorage.getItem('name') ? (
              logoutState ? (
                <div to='#' className='close-icon'>
                  {/* {iconsData.close} */}
                  <span>{iconsData.close}</span>
                </div>
              ) : (
                <p className='user-icon'>
                  <span>{iconsData.user}</span>
                </p>
              )
            ) : window.location.pathname === '/login' ||
              window.location.pathname === '/register' ? (
              <Link to='/login' className='login-link activeRoute'>
                <span>{iconsData.loginOutlined}</span> <span>Login</span>
              </Link>
            ) : (
              <Link
                to='/login'
                className={
                  'login-link ' + (mode === true ? 'darkColor2' : 'lightColor1')
                }
              >
                <span>{iconsData.loginOutlined}</span> <span>Login</span>
              </Link>
            )}

            {/* Logout Component */}
            <div className='logout__div'>
              <Logout />
            </div>
          </div>

          <span ref={searchHeaderIconRef} className='search-icon'>
            {iconsData.searchIcon}
          </span>

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
    </div>
  )
}

export default Header
