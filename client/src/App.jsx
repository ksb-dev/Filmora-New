import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// context
import { useMovieContext } from './context/context'

// components
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Watchlist from './pages/Watchlist/Watchlist'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import TvDetail from './pages/TvDetail/TvDetail'
import ActorDetail from './pages/ActorDetail/ActorDetail'
import MovieCast from './pages/MovieCast/MovieCast'
import TvCast from './pages/TvCast/TvCast'
import MovieBackdrops from './pages/MovieBackdrops/MovieBackdrops'
import TvBackdrops from './pages/TvBackdrops/TvBackdrops'
import MovieVideos from './pages/MovieVideos/MovieVideos'
import TvVideos from './pages/TvVideos/TvVideos'

//import Loading from './other/Loading/Loading'

// const Loading = lazy(() => import('./other/Loading/Loading'))

// const Home = lazy(() => import('./pages/Home/Home'))
// const Search = lazy(() => import('./pages/Search/Search'))
// const Login = lazy(() => import('./pages/Login/Login'))
// const Register = lazy(() => import('./pages/Register/Register'))
// const Watchlist = lazy(() => import('./pages/Watchlist/Watchlist'))
// const MovieDetail = lazy(() => import('./pages/MovieDetail/MovieDetail'))
// const TvDetail = lazy(() => import('./pages/TvDetail/TvDetail'))
// const ActorDetail = lazy(() => import('./pages/ActorDetail/ActorDetail'))
// const MovieCast = lazy(() => import('./pages/MovieCast/MovieCast'))
// const TvCast = lazy(() => import('./pages/TvCast/TvCast'))
// const MovieBackdrops = lazy(() =>
//   import('./pages/MovieBackdrops/MovieBackdrops')
// )
// const TvBackdrops = lazy(() => import('./pages/TvBackdrops/TvBackdrops'))
// const MovieVideos = lazy(() => import('./pages/MovieVideos/MovieVideos'))
// const TvVideos = lazy(() => import('./pages/TvVideos/TvVideos'))

const App = () => {
  const { mode } = useMovieContext()

  return (
    <div className={'app ' + (mode === true ? 'darkBg1' : 'lightBg1')}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path='/tv/:id' element={<TvDetail />} />
          <Route path='/actor/:id' element={<ActorDetail />} />
          <Route path='/movie/cast/:id' element={<MovieCast />} />
          <Route path='/tv/cast/:id' element={<TvCast />} />
          <Route path='/movie/backdrops/:id' element={<MovieBackdrops />} />
          <Route path='/tv/backdrops/:id' element={<TvBackdrops />} />
          <Route path='/movie/videos/:id' element={<MovieVideos />} />
          <Route path='/tv/videos/:id' element={<TvVideos />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
