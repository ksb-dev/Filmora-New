import React, { useState, useEffect, useRef } from 'react'

// data
import { sortArray } from '../../data/sortData'

// Redux
import { useSelector } from 'react-redux'

// Context
import { useMovieContext } from '../../context/context'

// Hooks
import { useSortFilter } from '../../hooks/useSortFilter'
import { useShowHide } from '../../hooks/useShowHide'

const Sort = ({ type }) => {
  const { mode, setIndex } = useMovieContext()
  const { sortMovies, sortShows } = useSortFilter()
  const { showSort, hideSort } = useShowHide()

  let sortState = ''

  if (type === 'movie') {
    sortState = useSelector(state => state.movies.sortState)
  } else {
    sortState = useSelector(state => state.tvShows.sortState)
  }

  // States
  const [open, setOpen] = useState(false)

  // Ref's
  const btnRef = useRef(null)
  const sortRef = useRef(null)
  const openRef = useRef(null)
  const closeRef = useRef(null)
  const closeInnerRef = useRef(null)

  // Toggle sort & Detect outside click of sort component
  useEffect(() => {
    const toggleSort = e => {
      if (!sortRef.current.contains(e.target)) {
        setOpen(false)
      } else {
        setOpen(!open)
      }
    }

    if (open) {
      showSort(btnRef, closeRef, closeInnerRef)
    } else {
      hideSort(btnRef, closeRef, closeInnerRef)
    }

    document.body.addEventListener('click', toggleSort)

    return () => {
      document.body.removeEventListener('click', toggleSort)
    }
  }, [open])

  const handleSort = id => {
    type === 'movie' ? sortMovies(id) : sortShows(id)
  }

  return (
    <div ref={sortRef} className='sort'>
      <div
        ref={openRef}
        className={
          'sort__open ' +
          (mode === true
            ? 'lightBg1 darkColor2 darkBorderBottom'
            : 'darkBg2 lightColor1 lightBorderBottom')
        }
      >
        <span>{sortState}</span>

        <span>
          <i className='fa-solid fa-chevron-down' ref={btnRef}></i>
        </span>
      </div>

      <div
        ref={closeRef}
        className={
          mode === true ? 'sort__close lightBg1' : 'sort__close darkBg2'
        }
      >
        <div ref={closeInnerRef} className='sort__close__inner'>
          {sortArray.map((sort, index) => (
            <span
              className={
                mode === true ? ' lightBg1 darkColor2' : ' darkBg2 lightColor1'
              }
              onClick={() => {
                handleSort(sort.id)
                setIndex(0)
              }}
              key={index}
            >
              {sort.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sort
