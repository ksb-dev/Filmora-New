import React, { useState } from 'react'

// React router dom
import { Link, useNavigate } from 'react-router-dom'

// context
import { useMovieContext } from '../../context/context'

// Hooks
import { useAuthentication } from '../../hooks/useAuthentication'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import SearchModal from '../../components/SearchModal/SearchModal'
import Search from '../../components/Search/Search'

// other
import LoadingOne from '../../other/LoadingOne/LoadingOne'

// data
import { iconsData } from '../../data/icons'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const { mode } = useMovieContext()
  const { login, isPending, error } = useAuthentication()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    login(email, password, setEmail, setPassword)
  }

  return (
    <div
      className={
        'login ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <Search />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <div className='login__inner '>
        <form
          className={
            'login__inner__form ' + (mode === true ? 'lightBg1' : 'darkBg2')
          }
          onSubmit={handleSubmit}
        >
          <p className='login__inner__form--title'>Login</p>
          <input
            type='email'
            placeholder='Email'
            className={
              'email ' +
              (mode === true
                ? 'lightBg1 darkColor1 darkBorderBottom'
                : 'darkBg2 lightColor1 lightBorderBottom')
            }
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type={show ? 'text' : 'password'}
            placeholder='Password'
            className={
              'password ' +
              (mode === true
                ? 'lightBg1 darkColor1 darkBorderBottom'
                : 'darkBg2 lightColor1 lightBorderBottom')
            }
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {/* Eye */}

          {password && show && (
            <span className='eye' onClick={() => setShow(false)}>
              {iconsData.eyeOpen}
            </span>
          )}

          {password && !show && (
            <span className='eye' onClick={() => setShow(true)}>
              {iconsData.eyeClose}
            </span>
          )}

          {/* Button */}

          {isPending ? (
            <button className={mode === true ? 'primaryBg' : 'primaryBg'}>
              <LoadingOne />
            </button>
          ) : (
            <button
              className={mode === true ? 'primaryBg' : 'primaryBg'}
              onSubmit={handleSubmit}
            >
              Submit
            </button>
          )}

          {/* Options */}
          <div className='login__inner__form__options'>
            <span>Don't hava an account? </span>
            <Link
              to='/register'
              className={
                'login__inner__options--option ' +
                (mode === true ? 'darkColor1' : 'lightColor1')
              }
            >
              Register
            </Link>
            {/* <Link to='#' className='login__inner__options--option'>
              Forgot your password?
            </Link> */}
          </div>

          {/* Error */}
          {error && (
            <p
              className={
                'login__inner__form__error ' +
                (mode === true ? 'lightAlpha6' : 'darkAlpha5')
              }
            >
              <span>{error}</span>
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
