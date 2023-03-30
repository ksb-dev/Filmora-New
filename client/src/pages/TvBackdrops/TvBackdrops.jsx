import React, { useEffect } from 'react'

// react router dom
import { useParams } from 'react-router-dom'

// hooks
import { useGetTvInfo } from '../../hooks/useGetTvInfo'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import Search from '../../components/Search/Search'
import ImageViewer from '../../components/ImageViewer/ImageViewer'
import AllBackdrops from '../../components/AllBackdrops/AllBackdrops'

const TvBackdrops = () => {
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
  const { getTvInfo, getTvBackdrops } = useGetTvInfo()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getTvInfo(id, setData, setLoading, setError)

    getTvBackdrops(id, setBackdrops, setBackdropsLoading, setBackdropsError)
  }, [])

  return (
    <div
      className={
        'tv__backdrops ' +
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

export default TvBackdrops
