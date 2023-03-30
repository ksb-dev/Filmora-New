import { useCallback } from 'react'

export const useGetTvInfo = () => {
  // Get movie info
  const getTvInfo = async (id, setData, setLoading, setError) => {
    const type = 'tv'

    setData({})
    setLoading(true)
    setError('')

    try {
      const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${
        import.meta.env.VITE_KEY
      }&language=en-US`

      const res = await fetch(url)
      const data = await res.json()

      if (data) {
        setData(data)
        setLoading(false)
        setError('')
      }
    } catch (error) {
      setData('')
      setLoading(false)
      setError('No details found.')
    }
  }

  // Get cast
  const getTvCast = async (id, setCast, setCastLoading, setCastError) => {
    const type = 'tv'

    setCast([])
    setCastLoading(true)
    setCastError('')

    try {
      const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${
        import.meta.env.VITE_KEY
      }&language=en-US`

      const res = await fetch(url)
      const data = await res.json()

      if (data) {
        setCast(data.cast)
        setCastLoading(false)
        setCastError('')
      }
    } catch (error) {
      setCast('')
      setCastLoading(false)
      setCastError('No cast found.')
    }
  }

  // Get backdrops
  const getTvBackdrops = async (
    id,
    setBackdrops,
    setBackdropsLoading,
    setBackdropsError
  ) => {
    const type = 'tv'

    setBackdrops([])
    setBackdropsLoading(true)
    setBackdropsError('')

    const url = `
https://api.themoviedb.org/3/${type}/${id}/images?api_key=${
      import.meta.env.VITE_KEY
    }`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data) {
        setBackdropsLoading(false)
        setBackdrops(data.backdrops)
        setBackdropsError('')
      }
    } catch (error) {
      setBackdrops('')
      setBackdropsLoading(false)
      setBackdropsError('Backdrops not found.')
    }
  }

  // Get trailer
  const getTvTrailer = async (
    id,
    setTrailerUrl,
    setTrailerLoading,
    setTrailerError
  ) => {
    const type = 'tv'

    setTrailerUrl('')
    setTrailerLoading(true)
    setTrailerError('')

    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${
          import.meta.env.VITE_KEY
        }&language=en-US`
      )
      let trailerUrl = await response.json()
      let value = ''

      trailerUrl.results.map(result => {
        if (result.official === true) {
          value = result.key
          setTrailerUrl(result.key)
        }
      })

      if (value === '') {
        setTrailerUrl(trailerUrl.results[0].key)
      }

      setTrailerLoading(false)
      setTrailerError('')
    } catch (error) {
      setTrailerLoading(false)
      setTrailerError('Failed to play video')
    }
  }

  // Get Trailer (0 - 786px)
  const getTvTrailer786px = async (
    id,
    setPlayerOneUrl,
    setPlayerOneLoading,
    setPlayerOneError
  ) => {
    const type = 'tv'

    setPlayerOneUrl('')
    setPlayerOneLoading(true)
    setPlayerOneError('')

    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${
          import.meta.env.VITE_KEY
        }&language=en-US`
      )
      let trailerUrl = await response.json()
      let value = ''

      trailerUrl.results.map(result => {
        if (result.official === true) {
          value = result.key
          setPlayerOneUrl(result.key)
        }
      })

      if (value === '') {
        setPlayerOneUrl(trailerUrl.results[0].key)
      }

      setPlayerOneLoading(false)
      setPlayerOneError('')
    } catch (error) {
      setPlayerOneLoading(false)
      setPlayerOneError('Failed to play video')
    }
  }

  // Get reviews
  const getTvReviews = async (
    id,
    setReviews,
    setReviewsLoading,
    setReviewsError
  ) => {
    const type = 'tv'

    setReviews([])
    setReviewsLoading(true)
    setReviewsError('')

    const url = `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${
      import.meta.env.VITE_KEY
    }&language=en-US&page=1`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data) {
        setReviews(data.results)
        setReviewsLoading(false)
        setReviewsError(false)
      }
    } catch (err) {
      setReviewsLoading(false)
      setReviewsError(true)
    }
  }

  // Get videos
  const getTvVideos = async (
    id,
    setVideos,
    setVideosLoading,
    setVideosError
  ) => {
    const type = 'tv'

    setVideos([])
    setVideosLoading(true)
    setVideosError('')

    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${
      import.meta.env.VITE_KEY
    }&language=en-US`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data) {
        setVideos(data.results)
        setVideosLoading(false)
        setVideosError(false)
      }
    } catch (err) {
      setVideosLoading(false)
      setVideosError(true)
    }
  }

  // Get actor detail
  const getActorDetail = async (
    id,
    setActorDetail,
    setActorDetailLoading,
    setActorDetailError
  ) => {
    setActorDetail('')
    setActorDetailLoading(true)
    setActorDetailError('')

    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${
      import.meta.env.VITE_KEY
    }&language=en-US`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data) {
        setActorDetail(data)
        setActorDetailLoading(false)
        setActorDetailError(false)
      }
    } catch (err) {
      setActorDetailLoading(false)
      setActorDetailError(true)
    }
  }

  // Get movie crew
  const getTvMovieCrew = async (id, setCrew, setCrewLoading, setCrewError) => {
    const type = 'tv'
    //sessionStorage.getItem('movieState') === 'movie' ? 'movie' : 'tv'

    const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${
      import.meta.env.VITE_KEY
    }&language=en-US`
    setCrewLoading(true)
    setCrewError(true)

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data) {
        setCrew(data)
        setCrewLoading(false)
        setCrewError(false)
      }
    } catch (err) {
      setCrewLoading(false)
      setCrewError(true)
    }
  }

  return {
    getTvInfo,
    getTvCast,
    getTvBackdrops,
    getTvTrailer,
    getTvTrailer786px,
    getTvReviews,
    getTvVideos,
    getActorDetail,
    getTvMovieCrew
  }
}
