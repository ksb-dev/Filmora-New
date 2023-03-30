import React, { useState } from 'react'

// Context
import { useMovieContext } from '../../../context/context'

// APIs
import { APIs } from '../../../APIs/APIs'

// React Icons
import { GrStar } from 'react-icons/gr'
import { HiOutlineUserCircle } from 'react-icons/hi'

const Review = ({ review }) => {
  const [show, setShow] = useState(false)
  const { mode } = useMovieContext()
  const { avatar_path, name, username, rating } = review.author_details
  const { content } = review

  return (
    <div
      className={
        'review__container ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div className='avatar__rating'>
        <div
          className={
            'avatar__rating__image ' + (mode === true ? 'lightBg2' : 'darkBg1')
          }
        >
          {avatar_path !== null && !avatar_path.startsWith('/https') ? (
            <img src={APIs.img_path + avatar_path} alt='User' />
          ) : (
            <span className='user'>
              <HiOutlineUserCircle style={{ height: '100%', width: '100%' }} />
            </span>
          )}
        </div>

        {rating && (
          <span className='rating'>
            <GrStar
              size={'25px'}
              style={{ color: 'var(--primary)', marginRight: '0.25rem' }}
            />
            {rating}
          </span>
        )}
      </div>

      <div className='name__review'>
        <span className='name'>{name ? name : 'Anonymous'}</span>

        {content ? (
          content.length > 95 ? (
            <>
              {!show ? (
                <>
                  <span className='content'>
                    {content.substring(0, 100) + '.....'}
                  </span>
                  <span
                    style={{
                      color: 'var(--blue)',
                      fontWeight: '400',
                      cursor: 'pointer'
                    }}
                    onClick={() => setShow(!show)}
                  >
                    Read more
                  </span>
                </>
              ) : (
                <>
                  <span className='content'>{content}</span>
                  <span
                    style={{
                      color: 'var(--blue)',
                      fontWeight: '400',
                      cursor: 'pointer'
                    }}
                    onClick={() => setShow(!show)}
                  >
                    Hide more
                  </span>
                </>
              )}
            </>
          ) : (
            <span className='content'>{content}</span>
          )
        ) : (
          <></>
        )}

        {/* {content ? (
          <p>
            {show ? (
              <>
                <span className='content'>{content}</span>
                <span
                  style={{
                    color: 'var(--blue)',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                  onClick={() => setShow(!show)}
                >
                  Hide more
                </span>
              </>
            ) : (
              <>
                {content.substring > 100 ? (
                  <>
                    <span className='content'>{content.substring(0, 100)}</span>
                    <span
                      style={{
                        color: 'var(--blue)',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                      onClick={() => setShow(!show)}
                    >
                      Read more
                    </span>
                  </>
                ) : (
                  <span className='content'>{content}</span>
                )}
              </>
            )}
          </p>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  )
}

export default Review
