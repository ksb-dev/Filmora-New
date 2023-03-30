import React, { useState, useRef, createContext, useContext } from 'react'

// 1. Create Context
const MovieContext = createContext()

const MovieProvider = ({ children }) => {
  const [mode, setMode] = useState(
    sessionStorage.getItem('mode') === 'true' ||
      sessionStorage.getItem('mode') === null
      ? true
      : false
  )

  // For wall images
  const [index, setIndex] = useState(0)

  // For switching between movie & tv
  const [movieState, setMovieState] = useState(true)

  // Logout component properties
  const [logoutState, setLogoutState] = useState(false)
  const logoutRef = useRef(null)
  const userIconRef = useRef(null)

  // Category component properties
  const [categoryState, setCategoryState] = useState(false)
  const categoryRef = useRef(null)

  // Menu component properties
  const [menuState, setMenuState] = useState(false)
  const menuIconRef = useRef(null)
  const menuRef = useRef(null)
  const menuInnerRef = useRef(null)

  // Image viewer
  const viewerRef = useRef(null)
  const innerViewerRef = useRef(null)

  // action, popular, war ...
  const [activeOption, setActiveOption] = useState(false)

  // movie / tv
  const [optionState, setOptionState] = useState(
    sessionStorage.getItem('movieState') || 'movie'
  )
  const [searchOptionState, setSearchOptionState] = useState('movie')

  // search query
  const [searchQuery, setSearchQuery] = useState(
    sessionStorage.getItem('searchQuery') || ''
  )

  // search results component
  const searchInputRef = useRef(null)
  const searchResultsRef = useRef(null)

  const headerRef = useRef(null)

  const searchSmallHeaderIconRef = useRef(null)
  const searchModalRef = useRef(null)

  const [searchComponentState, setsearchComponentState] = useState(false)
  const searchHeaderIconRef = useRef(null)
  const searchComponentRef = useRef(null)
  const searchComponentInnerRef = useRef(null)
  const setMovieInputToEmptyRef = useRef(null)
  const setTvInputToEmptyRef = useRef(null)

  const [type, setType] = useState(sessionStorage.getItem('movieState'))

  const [movieIdState, setMovieIdState] = useState(false)

  //  Info
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Cast
  const [cast, setCast] = useState([])
  const [castLoading, setCastLoading] = useState(true)
  const [castError, setCastError] = useState('')

  // Backdrop Index
  const [backdropIndex, setBackdropIndex] = useState(0)

  // Backdrops states
  const [backdrops, setBackdrops] = useState([])
  const [backdropsLoading, setBackdropsLoading] = useState(false)
  const [backdropsError, setBackdropsError] = useState('')

  // Videos
  const [videos, setVideos] = useState([])
  const [videosLoading, setVideosLoading] = useState(true)
  const [videosError, setVideosError] = useState('')

  // Trailer
  const [trailerUrl, setTrailerUrl] = useState('')
  const [trailerLoading, setTrailerLoading] = useState(true)
  const [trailerError, setTrailerError] = useState('')

  // Player
  const [playerUrl, setPlayerUrl] = useState('')
  const [playerLoading, setPlayerLoading] = useState(true)
  const [playerError, setPlayerError] = useState('')

  // Reviews
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [reviewsError, setReviewsError] = useState('')

  return (
    <MovieContext.Provider
      value={{
        mode,
        setMode,

        logoutState,
        setLogoutState,
        logoutRef,
        userIconRef,

        index,
        setIndex,

        movieState,
        setMovieState,

        categoryState,
        setCategoryState,
        categoryRef,

        menuState,
        setMenuState,
        menuIconRef,
        menuRef,
        menuInnerRef,

        activeOption,
        setActiveOption,

        optionState,
        setOptionState,

        searchOptionState,
        setSearchOptionState,

        searchQuery,
        setSearchQuery,

        searchInputRef,
        searchResultsRef,

        headerRef,

        searchModalRef,

        type,
        setType,

        movieIdState,
        setMovieIdState,

        viewerRef,
        innerViewerRef,

        data,
        setData,
        loading,
        setLoading,
        error,
        setError,

        cast,
        setCast,
        castLoading,
        setCastLoading,
        castError,
        setCastError,

        backdropIndex,
        setBackdropIndex,
        backdrops,
        setBackdrops,
        backdropsError,
        setBackdropsError,
        backdropsLoading,
        setBackdropsLoading,

        videos,
        setVideos,
        videosLoading,
        setVideosLoading,
        videosError,
        setVideosError,

        trailerUrl,
        setTrailerUrl,
        trailerLoading,
        setTrailerLoading,
        trailerError,
        setTrailerError,

        playerUrl,
        setPlayerUrl,
        playerLoading,
        setPlayerLoading,
        playerError,
        setPlayerError,

        reviews,
        setReviews,
        reviewsLoading,
        setReviewsLoading,
        reviewsError,
        setReviewsError,

        searchComponentState,
        setsearchComponentState,
        searchHeaderIconRef,
        searchSmallHeaderIconRef,
        searchComponentRef,
        searchComponentInnerRef,
        setMovieInputToEmptyRef,
        setTvInputToEmptyRef
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export const useMovieContext = () => {
  return useContext(MovieContext)
}

export { MovieContext, MovieProvider }
