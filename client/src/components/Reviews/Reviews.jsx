import React, { useEffect } from 'react'

// context
import { useMovieContext } from '../../context/context'

// components
import ReviewCard from '../ReviewCard/ReviewCard'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// hooks
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'
import { useGetTvInfo } from '../../hooks/useGetTvInfo'

const Reviews = ({ type, id }) => {
  const {
    mode,
    reviews,
    setReviews,
    reviewsLoading,
    setReviewsLoading,
    reviewsError,
    setReviewsError
  } = useMovieContext()
  const { getMovieReviews } = useGetMovieInfo()
  const { getTvReviews } = useGetTvInfo()

  useEffect(() => {
    type === 'movie'
      ? getMovieReviews(id, setReviews, setReviewsLoading, setReviewsError)
      : getTvReviews(id, setReviews, setReviewsLoading, setReviewsError)
  }, [id])

  return (
    <div
      className={
        'reviews ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div className='reviews__title'>
        <span className='title'>Reviews</span>
        <p className='length'>
          <span>{reviews && reviews.length}</span>
        </p>
        {/* <span className='icon'>{iconsData.forwardArrow}</span> */}
      </div>

      <div className='reviews__loading__error'>
        {reviewsLoading && (
          <span className='reviews__loading__error--loading'>
            <Loading />
          </span>
        )}

        {!reviewsLoading && reviewsError && (
          <span className='reviews__loading__error--error'>
            <Error msg={'No reviews found.'} />
          </span>
        )}

        {!reviewsLoading && !reviewsError && reviews && reviews.length === 0 && (
          <span className='reviews__loading__error--error'>
            <Error msg={'No reviews found.'} />
          </span>
        )}
      </div>

      <div className='reviews__container'>
        {reviews &&
          reviews.length > 0 &&
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
      </div>
    </div>
  )
}

export default Reviews
