import React, { useEffect } from 'react'

// react router dom
import { useParams } from 'react-router-dom'

// hooks
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import Search from '../../components/Search/Search'
import ImageViewer from '../../components/ImageViewer/ImageViewer'
import AllBackdrops from '../../components/AllBackdrops/AllBackdrops'

const MovieBackdrops = () => {
  const { id } = useParams()
  const {
    mode,
    setData,
    setLoading,
    setError,
    setBackdrops,
    setBackdropsError,
    setBackdropsLoading
  } = useMovieContext()
  const { getMovieInfo, getMovieBackdrops } = useGetMovieInfo()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getMovieInfo(id, setData, setLoading, setError)

    getMovieBackdrops(id, setBackdrops, setBackdropsLoading, setBackdropsError)
  }, [])

  return (
    <div
      className={
        'movie__backdrops ' +
        (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <SmallHeader />
      <Menu />
      <Search />
      <ImageViewer />
      <AllBackdrops />
    </div>
  )
}

export default MovieBackdrops
