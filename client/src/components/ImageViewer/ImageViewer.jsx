import React, { useEffect, useRef } from 'react'

// APIs
import { APIs } from '../../APIs/APIs'

// Hooks
import { useShowHide } from '../../hooks/useShowHide'

// Context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

const ImageViewer = () => {
  const {
    backdrops,
    backdropIndex,
    setBackdropIndex,
    viewerRef,
    innerViewerRef,
    mode
  } = useMovieContext()
  const { hideViewer } = useShowHide()

  const buttonsRef = useRef(null)

  // Detect outside click of Side Menu
  useEffect(() => {
    const handleOutsideClick = e => {
      if (
        viewerRef &&
        viewerRef.current &&
        viewerRef.current.contains(e.target) &&
        innerViewerRef &&
        innerViewerRef.current &&
        !innerViewerRef.current.contains(e.target)
      ) {
        hideViewer(innerViewerRef, viewerRef)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [viewerRef, innerViewerRef, hideViewer])

  const previousImage = () => {
    backdropIndex < 1
      ? setBackdropIndex(backdrops.length - 1)
      : setBackdropIndex(prevIndex => prevIndex - 1)
  }

  const nextImage = () => {
    backdropIndex === backdrops.length - 1
      ? setBackdropIndex(0)
      : setBackdropIndex(prevIndex => prevIndex + 1)
  }

  const showButtons = () => {
    buttonsRef.current.style.display = 'flex'
  }

  const hideButtons = () => {
    buttonsRef.current.style.display = 'none'
  }

  return (
    <div
      ref={viewerRef}
      className={'viewer ' + (mode === true ? 'lightAlpha6' : 'darkAlpha6')}
    >
      <div
        ref={innerViewerRef}
        className={'viewer__inner ' + (mode === true ? 'lightBg1' : 'darkBg2')}
        onMouseOver={() => showButtons()}
        onMouseLeave={() => hideButtons()}
      >
        {backdrops && backdrops[backdropIndex] && (
          <>
            <img
              className='img-1'
              src={
                backdrops[backdropIndex].file_path !== null
                  ? APIs.img_path + backdrops[backdropIndex].file_path
                  : APIs.no_image_url
              }
              alt='image'
            />

            <img
              className='img-2'
              src={
                backdrops[backdropIndex].file_path !== null
                  ? APIs.img_path_w780 + backdrops[backdropIndex].file_path
                  : APIs.no_image_url
              }
              alt='image'
              loading='lazy'
            />

            <img
              className='img-3'
              src={
                backdrops[backdropIndex].file_path !== null
                  ? APIs.img_path_w780 + backdrops[backdropIndex].file_path
                  : APIs.no_image_url
              }
              alt='image'
            />
          </>
        )}

        {backdrops && backdrops.length > 1 ? (
          <div className='viewer__inner__buttons' ref={buttonsRef}>
            <p
              onClick={previousImage}
              className={
                mode === true ? 'darkBg1 lightColor1' : 'lightBg1 darkColor1'
              }
            >
              <span>{iconsData.prev}</span>
            </p>

            <div
              className={
                'viewer__inner__buttons--length ' +
                (mode === true ? 'darkBg1 lightColor1' : 'lightBg1 darkColor1')
              }
            >
              <span>
                {backdropIndex + 1} / {backdrops.length}
              </span>
            </div>

            <p
              onClick={nextImage}
              className={
                mode === true ? 'darkBg1 lightColor1' : 'lightBg1 darkColor1'
              }
            >
              <span>{iconsData.next}</span>
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default ImageViewer
