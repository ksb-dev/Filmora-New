import React from 'react'

// data
import { iconsData } from '../../data/icons'

// redux
import { useSelector } from 'react-redux'

const WatchlistIcon = () => {
  const savedMovies = useSelector(state => state.savedMovies.savedMovies)
  const savedShows = useSelector(state => state.savedShows.savedShows)

  return (
    <div className='watchlist-icon'>
      <div>
        <span className='title'>{iconsData.watchlist} Watchlist</span>
        <p>
          <span className='length'>
            {savedMovies &&
              savedShows &&
              savedShows.length + savedMovies.length}
          </span>
        </p>
      </div>
    </div>
  )
}

export default WatchlistIcon
