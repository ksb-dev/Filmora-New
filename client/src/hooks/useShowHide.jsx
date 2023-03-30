export const useShowHide = () => {
  // Toggle sort component
  const showSort = (ref1, ref2, ref3) => {
    if (ref1 && ref1.current && ref2 && ref2.current && ref3 && ref3.current) {
      ref1.current.style.transform = 'rotate(180deg)'
      ref1.current.style.transition = 'all 0.3s ease'

      ref2.current.style.zIndex = '5'
      ref2.current.style.opacity = '1'

      setTimeout(() => {
        ref3.current.style.transform = 'scaleY(1)'
      }, 150)
    }
  }

  const hideSort = (ref1, ref2, ref3) => {
    if (ref1 && ref1.current && ref2 && ref2.current && ref3 && ref3.current) {
      ref1.current.style.transform = 'rotate(0deg)'
      ref1.current.style.transition = 'all 0.3s ease'

      ref3.current.style.transform = 'scaleY(0)'

      setTimeout(() => {
        if (ref2 && ref2.current) {
          ref2.current.style.zIndex = '-1'
          ref2.current.style.opacity = '0'
        }
      }, 150)
    }
  }

  const showOption = (ref1, ref2) => {
    ref1.current.style.transform = 'rotate(180deg)'
    ref1.current.style.transition = 'all 0.3s ease'

    ref2.current.style.transform = 'scaleY(1)'
  }

  const hideOption = (ref1, ref2) => {
    ref1.current.style.transform = 'rotate(0deg)'
    ref1.current.style.transition = 'all 0.3s ease'

    ref2.current.style.transform = 'scaleY(0)'
  }

  const showForm = (ref1, ref2) => {
    ref1.current.style.transition = 'all 0s ease'
    ref1.current.style.opacity = '1'
    ref1.current.style.zIndex = '10'
    ref2.current.style.transition = 'all 0.3s ease'
    ref2.current.style.opacity = '1'
  }

  const hideForm = (ref1, ref2) => {
    ref1.current.style.transition = 'all 0s ease'
    ref1.current.style.opacity = '0'
    ref2.current.style.transition = 'all 0.3s ease'
    ref2.current.style.opacity = '0'
    ref2.current.style.zIndex = '-1'
  }

  const showMenu = (ref1, ref2) => {
    ref1.current.style.transform = 'translateY(0%)'
    setTimeout(() => {
      ref2.current.style.transform = 'scaleY(1)'
    }, 100)
  }

  const hideMenu = (ref1, ref2) => {
    setTimeout(() => {
      ref1.current.style.transform = 'translateY(-150%)'
    }, 100)
    ref2.current.style.transform = 'scaleY(0)'
  }

  // Toggle logout components
  const showLogout = logoutRef => {
    logoutRef.current.style.transform = 'scaleY(1)'
  }

  const hideLogout = logoutRef => {
    logoutRef.current.style.transform = 'scaleY(0)'
  }

  const showPlayer = (ref1, ref2) => {
    ref1.current.style.transform = 'scaleY(1)'
    ref2.current.style.transform = 'scaleY(1)'
  }

  const hidePlayer = (ref1, ref2) => {
    ref1.current.style.transform = 'scaleY(0)'
    ref2.current.style.transform = 'scaleY(0)'
  }

  const showViewer = (ref1, ref2) => {
    ref1.current.style.transform = 'scaleY(1)'
    ref2.current.style.transform = 'scaleY(1)'
  }

  const hideViewer = (ref1, ref2) => {
    ref1.current.style.transform = 'scaleY(0)'
    ref2.current.style.transform = 'scaleY(0)'
  }

  return {
    showSort,
    hideSort,
    showOption,
    hideOption,
    showForm,
    hideForm,
    showMenu,
    hideMenu,
    showLogout,
    hideLogout,
    showPlayer,
    hidePlayer,
    showViewer,
    hideViewer
  }
}
