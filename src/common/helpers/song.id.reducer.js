const songIdReducer = favoritesArray => {
    return favoritesArray.reduce((acc, curr) => {
      console.log({ acc, curr })
      acc[curr.songId] = curr.id
      return acc
    }, {})
  }

export default songIdReducer