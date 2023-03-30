import React, { useEffect } from 'react'

// react router dom
import { useParams } from 'react-router-dom'

// hooks
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import SearchModal from '../../components/SearchModal/SearchModal'
import FullCast from '../../components/FullCast/FullCast'

const MovieCast = () => {
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
  const { getMovieInfo, getMovieCast } = useGetMovieInfo()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getMovieInfo(id, setData, setLoading, setError)

    getMovieCast(id, setCast, setCastLoading, setCastError)
  }, [])

  return (
    <div
      className={
        'movie__cast ' +
        (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <Search />
      <SmallHeader />
      <Menu />
      <SearchModal />
      <FullCast />
    </div>
  )
}

export default MovieCast
