import React, { useState, useEffect, useRef } from 'react'

// context
import { useMovieContext } from '../../context/context'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

// data
import { iconsData } from '../../data/icons'

const Options = () => {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const optionRef = useRef(null)
  const closeRef = useRef(null)

  const { mode, setSearchQuery, searchOptionState, setSearchOptionState } =
    useMovieContext()
  const { showOption, hideOption } = useShowHide()

  // useEffect(() => {
  //   const toggleSort = e => {
  //     //setOpen(false)

  //     if (optionRef.current && !optionRef.current.contains(e.target)) {
  //       setOpen(false)
  //     } else {
  //       setOpen(!open)
  //     }
  //   }

  //   if (open) {
  //     showOption(btnRef, closeRef)
  //   } else {
  //     hideOption(btnRef, closeRef)
  //   }

  //   document.body.addEventListener('click', toggleSort)

  //   return () => {
  //     document.body.removeEventListener('click', toggleSort)
  //   }
  // }, [open])

  const handleOptionState = () => {
    setSearchQuery('')
    if (searchOptionState === 'movie') {
      setSearchOptionState('tv')
    } else {
      setSearchOptionState('movie')
    }
  }

  return (
    <div className='options'>
      <div className='options__inner'>
        {searchOptionState === 'movie' ? (
          <p>
            <span className='checked'></span> Movie
          </p>
        ) : (
          <p onClick={() => handleOptionState()}>
            <span
              className={
                'notChecked ' +
                (mode === true ? 'darkCheckBorder ' : 'lightCheckBorder')
              }
            ></span>
            Movie
          </p>
        )}
        {searchOptionState === 'tv' ? (
          <p>
            <span className='checked'></span> Tv
          </p>
        ) : (
          <p onClick={() => handleOptionState()}>
            <span
              className={
                'notChecked ' +
                (mode === true ? 'darkCheckBorder ' : 'lightCheckBorder')
              }
            ></span>
            Tv
          </p>
        )}
      </div>
    </div>
  )
}

export default Options
