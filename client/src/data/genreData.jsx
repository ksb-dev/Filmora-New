// React Icons (Genre)
import {
  GiPunchBlast,
  GiPistolGun,
  GiDualityMask,
  GiTank
} from 'react-icons/gi'
import { SlCompass, SlGhost, SlMusicToneAlt } from 'react-icons/sl'
import { BsCameraReels } from 'react-icons/bs'
import { TfiFaceSmile, TfiFaceSad } from 'react-icons/tfi'
import { MdOutlineFamilyRestroom } from 'react-icons/md'
import { RxMagicWand } from 'react-icons/rx'
import { BsHourglassSplit } from 'react-icons/bs'
import { IoFootstepsOutline } from 'react-icons/io5'
import { RiHeartsLine, RiKnifeBloodLine, RiCactusLine } from 'react-icons/ri'

export const genreArray = [
  {
    icon1: <GiPunchBlast size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 28,
    genre: 'Action',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <SlCompass size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 12,
    genre: 'Adventure',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <GiDualityMask size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 16,
    genre: 'Animation',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <TfiFaceSmile size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 35,
    genre: 'Comedy',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <GiPistolGun size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 80,
    genre: 'Crime',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <BsCameraReels size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 99,
    genre: 'Documentary',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <TfiFaceSad size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 18,
    genre: 'Drama',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: (
      <MdOutlineFamilyRestroom
        size={'20px'}
        style={{ marginRight: '0.5rem' }}
      />
    ),
    id: 10751,
    genre: 'Family',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <RxMagicWand size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 14,
    genre: 'Fantasy',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },

  {
    icon1: <BsHourglassSplit size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 36,
    genre: 'History',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <SlGhost size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 27,
    genre: 'Horror',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <SlMusicToneAlt size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 10402,
    genre: 'Music',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: (
      <IoFootstepsOutline size={'20px'} style={{ marginRight: '0.5rem' }} />
    ),
    id: 9648,
    genre: 'Mystery',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <RiHeartsLine size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 10749,
    genre: 'Romance',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },

  {
    icon1: <RiKnifeBloodLine size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 53,
    genre: 'Thriller',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <GiTank size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 10752,
    genre: 'War',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    icon1: <RiCactusLine size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 37,
    genre: 'Western',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  }
]
