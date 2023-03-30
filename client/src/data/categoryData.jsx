import React from 'react'

// React Icons
import { BsGraphUp } from 'react-icons/bs'
import { TfiStar } from 'react-icons/tfi'

// export function categoryArray () {
//   return [
//     {
//       icon: <BsGraphUp size={'20px'} style={{ marginRight: '0.5rem' }} />,
//       category: 'popular',
//       value: 'Popular',
//       path: '/'
//     },

//     {
//       icon: <TfiStar size={'20px'} style={{ marginRight: '0.5rem' }} />,
//       category: 'top',
//       value: 'Top Rated',
//       path: '/top'
//     }
//   ]
// }

export const categoryArray = [
  {
    icon: <BsGraphUp size={'20px'} style={{ marginRight: '0.5rem' }} />,
    category: 'popular',
    value: 'Popular',
    path: '/'
  },

  {
    icon: <TfiStar size={'20px'} style={{ marginRight: '0.5rem' }} />,
    category: 'top',
    value: 'Top Rated',
    path: '/top'
  }
]
