import React, { useState, useEffect, useRef } from 'react'

// Sort Data
import { sortArray } from '../../../data/sortData'

// Redux
import { useSelector } from 'react-redux'

// Context
import { useMovieContext } from '../../../context/context'

// Hooks
import { useSortFilter } from '../../../hooks/useSortFilter'
import { useShowHide } from '../../../hooks/useShowHide'

const Sort = () => {
  const { sortState } = useSelector(state => state.movies)
  const { mode, setIndex } = useMovieContext()
  const { sortMovies } = useSortFilter()
  const { showSort, hideSort } = useShowHide()

  // States
  const [open, setOpen] = useState(false)

  // Ref's
  const btnRef = useRef(null)
  const sortRef = useRef(null)
  const openRef = useRef(null)
  const closeRef = useRef(null)

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
      showSort(btnRef, closeRef)
    } else {
      hideSort(btnRef, closeRef)
    }

    document.body.addEventListener('click', toggleSort)

    return () => {
      document.body.removeEventListener('click', toggleSort)
    }
  }, [open])

  return (
    <div ref={sortRef} className='sort'>
      <div
        ref={openRef}
        className={
          'sort__open ' +
          (mode === true ? 'lightBg2 darkColor2' : 'darkBg1 lightColor1')
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
          mode === true ? 'sort__close lightBg2' : 'sort__close darkBg1'
        }
      >
        {sortArray.map((sort, index) => (
          <span
            className={
              mode === true ? ' lightBg2 darkColor2' : ' darkBg1 lightColor1'
            }
            onClick={() => {
              sortMovies(sort.id)
              setIndex(0)
            }}
            key={index}
          >
            {/* {sort.icon}  */}
            {sort.value}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Sort
