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

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const { mode } = useMovieContext()
  const { register, isPending, error } = useAuthentication()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    register(name, email, password, setName, setEmail, setPassword)
  }

  return (
    <div
      className={
        'register ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <Search />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <div className='register__inner '>
        <form
          className={
            'register__inner__form ' + (mode === true ? 'lightBg1' : 'darkBg2')
          }
          onSubmit={handleSubmit}
        >
          <p className='register__inner__form--title'>Register</p>

          <input
            type='text'
            placeholder='Name'
            className={
              'name ' +
              (mode === true
                ? 'lightBg1 darkColor1 darkBorderBottom'
                : 'darkBg2 lightColor1 lightBorderBottom')
            }
            value={name}
            onChange={e => setName(e.target.value)}
          />

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
          <div className='register__inner__form__options'>
            <span>Already hava an account? </span>
            <Link
              to='/login'
              className={
                'register__inner__options--option ' +
                (mode === true ? 'darkColor1' : 'lightColor1')
              }
            >
              Login
            </Link>
            {/* <Link to='#' className='Register__inner__options--option'>
              Forgot your password?
            </Link> */}
          </div>

          {/* Error */}
          {error && (
            <p
              className={
                'register__inner__form__error ' +
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

export default Register
