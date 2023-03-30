import React, { useState } from 'react'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

const MenuIcon = ({ menuIconRef }) => {
  const { mode, menuState } = useMovieContext()

  return (
    <p
      ref={menuIconRef}
      className={'menu-icon ' + (mode === true ? 'darkColor1' : 'lightColor1')}
    >
      {!menuState ? iconsData.menu : iconsData.close2} <span>Menu</span>
    </p>
  )
}

export default MenuIcon
