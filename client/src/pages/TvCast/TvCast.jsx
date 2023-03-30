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
import FullCast from '../../components/FullCast/FullCast'

const TvCast = () => {
  const { id } = useParams()
  const {
    mode,
    setData,
    setLoading,
    setError,
    setCast,
    setCastLoading,
    setCastError
  } = useMovieContext()
  const { getTvInfo, getTvCast } = useGetTvInfo()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getTvInfo(id, setData, setLoading, setError)

    getTvCast(id, setCast, setCastLoading, setCastError)
  }, [])

  return (
    <div
      className={
        'tv__cast ' +
        (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <SmallHeader />
      <Menu />
      <Search />
      <FullCast />
    </div>
  )
}

export default TvCast
