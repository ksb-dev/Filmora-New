import React from 'react'

// Circular progress bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

const CircularProgressBar = ({ vote_average }) => {
  return (
    <>
      <CircularProgressbar
        value={vote_average * 10}
        strokeWidth={5}
        styles={buildStyles({
          pathColor: '#fff'
        })}
      />
      <span>{Number(String(vote_average).substring(0, 3))}</span>
    </>
  )
}

export default CircularProgressBar
