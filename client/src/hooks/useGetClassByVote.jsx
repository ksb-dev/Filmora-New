export const useGetClassByVote = () => {
  const getClassBg = vote => {
    if (vote >= 7.5) {
      return 'greenBg'
    } else if (vote >= 5) {
      return 'orangeBg'
    } else {
      return 'redBg'
    }
  }

  const getClassColor = vote => {
    if (vote >= 7.5) {
      return 'greenColor'
    } else if (vote >= 5) {
      return 'orangeColor'
    } else {
      return 'redColor'
    }
  }
  return { getClassBg, getClassColor }
}
