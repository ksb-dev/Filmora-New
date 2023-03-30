import React from 'react'

// Context
import { useMovieContext } from '../../context/context'

// Redux
import { useSelector } from 'react-redux'

const Pagination = ({ type }) => {
  const { mode, setMovieState, movieState, setIndex } = useMovieContext()
  let totalPages = ''

  if (type === 'movie') {
    totalPages = useSelector(state => state.movies.totalPages)
  } else {
    totalPages = useSelector(state => state.tvShows.totalPages)
  }

  const storedPage = Number(sessionStorage.getItem('page'))
  const storedSearchPage = Number(sessionStorage.getItem('searchPage'))

  let number = 0
  if (window.location.pathname === '/search') {
    number = storedSearchPage !== 0 ? storedSearchPage : 1
  } else {
    number = storedPage !== 0 ? storedPage : 1
  }

  const check = () => {
    setMovieState(!movieState)
    setIndex(0)
  }

  // Next and Prev
  const goToPage = value => {
    let pageNumber = 0

    if (window.location.pathname === '/search') {
      pageNumber = sessionStorage.getItem('searchPage')
    } else {
      pageNumber = sessionStorage.getItem('page')
    }

    if (value === 'prev' && window.location.pathname === '/search') {
      sessionStorage.setItem('searchPage', Number(pageNumber) - 1)
    } else {
      sessionStorage.setItem('searchPage', Number(pageNumber) + 1)
    }

    if (value === 'prev' && !window.location.pathname.includes('search')) {
      sessionStorage.setItem('page', Number(pageNumber) - 1)
    } else {
      sessionStorage.setItem('page', Number(pageNumber) + 1)
    }

    check()
  }

  // Group of 5 buttons
  const getPaginationGroup = () => {
    let start = Math.floor((number - 1) / 5) * 5

    if (start + 5 < totalPages) {
      return new Array(5).fill().map((_, idx) => start + idx + 1)
    }

    return new Array(Math.abs(start - totalPages))
      .fill()
      .map((_, idx) => start + idx + 1)
  }

  // Change page
  const changePage = e => {
    const pageNumber = Number(e.target.textContent)

    if (window.location.pathname === '/search') {
      sessionStorage.setItem('searchPage', pageNumber)
    } else {
      sessionStorage.setItem('page', pageNumber)
    }

    check()
  }

  return (
    <div className='pagination'>
      {totalPages ? (
        <button
          onClick={() => goToPage('prev')}
          className={
            'pagination--prevBtn ' +
            (number === 1
              ? 'disabledBtn '
              : mode === true
              ? 'primaryBg '
              : 'primaryBg ')
          }
        >
          <span>
            <i className='fa-solid fa-chevron-left'></i>
          </span>
        </button>
      ) : (
        <></>
      )}

      {getPaginationGroup().map((item, index) => (
        <button
          className={
            'pagination--btn ' +
            (number === item
              ? mode === true
                ? 'activeBtn '
                : 'activeBtn '
              : mode === true
              ? 'lightBg2 darkColor1'
              : 'darkBg1 lightColor1')
          }
          onClick={changePage}
          key={index}
        >
          <span>{item}</span>
        </button>
      ))}

      {totalPages && number !== totalPages ? (
        <button
          onClick={() => goToPage('next')}
          className={
            'pagination--nextBtn ' + (mode === true ? 'primaryBg' : 'primaryBg')
          }
        >
          <span>
            <i className='fa-solid fa-chevron-right'></i>
          </span>
        </button>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Pagination
