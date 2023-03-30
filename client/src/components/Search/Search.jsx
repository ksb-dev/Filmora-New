import React, { useEffect } from 'react'

// react-router-dom
import { useNavigate } from 'react-router-dom'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { getMovieResults } from '../../redux/services/movies/getMovieResults'
import { getTvResults } from '../../redux/services/shows/getTvResults'
import { setMovieResultsToZero } from '../../redux/services/movies/getMovieResults'
import { setTvResultsToZero } from '../../redux/services/shows/getTvResults'

// components
import Options from '../../other/Options/Options'
import SearchResults from '../SearchResults/SearchResults'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

const Search = () => {
  const {
    mode,
    setIndex,
    searchQuery,
    setSearchQuery,
    searchOptionState,
    searchInputRef,
    movieState,
    setMovieState,
    searchComponentRef,
    searchComponentInnerRef,
    searchComponentState,
    setsearchComponentState,
    searchHeaderIconRef,
    searchSmallHeaderIconRef,
    setMovieInputToEmptyRef,
    setTvInputToEmptyRef
  } = useMovieContext()

  const movieResults = useSelector(state => state.movieResults.movieResults)
  const tvResults = useSelector(state => state.tvResults.tvResults)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { showMenu, hideMenu } = useShowHide()

  // Toggle logout & Detect outside click of logout component
  useEffect(() => {
    const togglesearchComponent = e => {
      if (
        searchComponentInnerRef &&
        searchComponentInnerRef.current &&
        searchComponentInnerRef.current.contains(e.target)
      ) {
        return
      } else if (
        searchHeaderIconRef &&
        searchHeaderIconRef.current &&
        !searchHeaderIconRef.current.contains(e.target)
      ) {
        setsearchComponentState(false)
      } else {
        setsearchComponentState(!searchComponentState)
      }
    }

    if (searchComponentState) {
      showMenu(searchComponentRef, searchComponentInnerRef)
    } else {
      hideMenu(
        searchComponentRef && searchComponentRef,
        searchComponentInnerRef && searchComponentInnerRef
      )
      dispatch(setMovieResultsToZero())
      setSearchQuery('')
    }

    document.body.addEventListener('click', togglesearchComponent)

    return () => {
      document.body.removeEventListener('click', togglesearchComponent)
    }
  }, [searchComponentState])

  const handleSubmit = e => {
    e.preventDefault()
    sessionStorage.setItem('searchQuery', searchQuery)
    setIndex(0)
    sessionStorage.setItem('searchPage', 1)

    setSearchQuery('')
    setMovieState(!movieState)

    navigate('/search')
  }

  function getResults (value) {
    setTimeout(() => {
      if (searchOptionState === 'movie') {
        dispatch(getMovieResults(value))
      }
      if (searchOptionState === 'tv') {
        dispatch(getTvResults(value))
      }
    }, 1000)
  }

  const handleCancel = () => {
    setSearchQuery('')

    if (searchOptionState === 'movie') {
      dispatch(setMovieResultsToZero())
    } else {
      dispatch(setTvResultsToZero())
    }
  }

  return (
    <div
      ref={searchComponentRef}
      className={
        'search__component ' +
        (mode === true ? 'lightAlpha6 darkColor1' : 'darkAlpha6 lightColor1')
      }
    >
      <div
        ref={searchComponentInnerRef}
        className={
          'search__component__inner ' + (mode === true ? 'lightBg1' : 'darkBg2')
        }
      >
        <div className='search__component__inner__one'>
          {/* Options */}
          <div className='search__component__inner__one__switch'>
            <Options />
          </div>

          {/* Search bar */}
          <div className={'search__component__inner__one__search-bar '}>
            <form onSubmit={e => handleSubmit(e)} ref={searchInputRef}>
              <input
                type='text'
                placeholder={
                  searchOptionState === 'movie' ? 'Search Movie' : 'Search Tv'
                }
                onChange={e => {
                  setSearchQuery(e.target.value)
                  getResults(e.target.value)
                }}
                value={searchQuery}
                className={
                  mode === true
                    ? 'lightBg1 darkBorderBottom'
                    : 'darkBg2 lightBorderBottom'
                }
              />

              <span
                ref={setMovieInputToEmptyRef}
                className='cancel'
                onClick={() => handleCancel()}
              >
                {iconsData.close2}
              </span>
            </form>
          </div>
        </div>

        {searchOptionState === 'movie' && searchQuery !== '' && (
          <SearchResults results={movieResults} />
        )}

        {searchOptionState === 'tv' && searchQuery !== '' && (
          <SearchResults results={tvResults} />
        )}
      </div>
    </div>
  )
}

export default Search
