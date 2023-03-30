import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { setMovieResultsToZero } from '../../redux/services/movies/getMovieResults'

// context
import { useMovieContext } from '../../context/context'

// components
//import Search from '../Search/Search'

// redux
import { useSelector } from 'react-redux'

const SearchModal = () => {
  const { mode, searchModalRef, setSearchQuery, searchOptionState } =
    useMovieContext()

  let results = ''

  const dispatch = useDispatch()

  if (searchOptionState === 'movie') {
    results = useSelector(state => state.movieResults.movieResults)
  } else {
    results = useSelector(state => state.tvResults.tvResults)
  }

  const [windowWidth, setWindowWidth] = useState(0)

  window.onresize = () => {
    setWindowWidth(window.innerWidth)
  }

  // const hideModal = () => {
  //   setSearchQuery('')
  //   dispatch(setMovieResultsToZero())
  //   searchModalRef.current.style.zIndex = '-1'
  //   searchModalRef.current.style.opacity = '0'
  // }

  // useEffect(() => {
  //   if (windowWidth >= '786') {
  //     hideModal()
  //   }
  // }, [windowWidth])

  return (
    <div
      ref={searchModalRef}
      className={
        'search__modal ' + (mode === true ? 'lightAlpha5' : 'darkAlpha5')
      }
    >
      <div className='search__modal__inner'>{/* <Search /> */}</div>
    </div>
  )
}

export default SearchModal
