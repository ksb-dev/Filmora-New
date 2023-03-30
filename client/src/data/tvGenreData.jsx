// React Icons (Genre)
import {
  GiPunchBlast,
  GiPistolGun,
  GiDualityMask,
  GiTank
} from 'react-icons/gi'
import { BsCameraReels } from 'react-icons/bs'
import { TfiFaceSmile, TfiFaceSad } from 'react-icons/tfi'
import { MdOutlineFamilyRestroom } from 'react-icons/md'
import { BsNewspaper } from 'react-icons/bs'
import { IoFootstepsOutline } from 'react-icons/io5'
import { RiKakaoTalkLine, RiCactusLine } from 'react-icons/ri'
import { FaChild } from 'react-icons/fa'
import { BiShow } from 'react-icons/bi'

export const tvGenreArray = [
  {
    //icon: <GiPunchBlast size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <GiPunchBlast size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 10759,
    genre: 'Action',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  // {
  //   icon: <SlCompass size={'25px'} style={{ marginRight: '0.5rem' }} />,
  //   icon1: <SlCompass size={'20px'} style={{ marginRight: '0.5rem' }} />,
  //   id: 12,
  //   genre: 'Adventure',
  //   url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
  //     import.meta.env.VITE_KEY
  //   }`
  // },
  {
    //icon: <GiDualityMask size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <GiDualityMask size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 16,
    genre: 'Animation',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    //icon: <TfiFaceSmile size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <TfiFaceSmile size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 35,
    genre: 'Comedy',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    //icon: <GiPistolGun size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <GiPistolGun size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 80,
    genre: 'Crime',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    //icon: <BsCameraReels size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <BsCameraReels size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 99,
    genre: 'Documentary',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    //icon: <TfiFaceSad size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <TfiFaceSad size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 18,
    genre: 'Drama',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    // icon: (
    //   <MdOutlineFamilyRestroom
    //     size={'25px'}
    //     style={{ marginRight: '0.5rem' }}
    //   />
    // ),
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
    //icon: <FaChild size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <FaChild size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 10762,
    genre: 'Kids',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },

  ,
  {
    // icon: (
    //   <IoFootstepsOutline size={'25px'} style={{ marginRight: '0.5rem' }} />
    // ),
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
    //icon: <BsNewspaper size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <BsNewspaper size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 10763,
    genre: 'News',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    //icon: <BiShow size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <BiShow size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 10764,
    genre: 'Reality',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  // {
  //   //icon: <GiUfo size={'25px'} style={{ marginRight: '0.5rem' }} />,
  //icon1: <GiUfo size={'20px'} style={{ marginRight: '0.5rem' }} />,
  //   id: 10765,
  //   genre: 'Science & Fiction',
  //   url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
  //     import.meta.env.VITE_KEY
  //   }`
  // },

  {
    //icon: <RiKakaoTalkLine size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <RiKakaoTalkLine size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 10767,
    genre: 'Talk',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    //icon: <GiTank size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <GiTank size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 10786,
    genre: 'War',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  },
  {
    //icon: <RiCactusLine size={'25px'} style={{ marginRight: '0.5rem' }} />,
    icon1: <RiCactusLine size={'20px'} style={{ marginRight: '0.5rem' }} />,
    id: 37,
    genre: 'Western',
    url: `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_KEY
    }`
  }
]
