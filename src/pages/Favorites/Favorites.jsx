import React, { useEffect, useState } from 'react'
import { SongsService } from '../Songs/songs.service'
import { Grid, CircularProgress, Box } from '@mui/material'
import Song from '../Songs/Song'
import songIdReducer from '../../common/helpers/song.id.reducer'

const limit = 10

export default function Favorites() {
  const [favorites, setFavorites] = useState({
    count: 0,
    data: [],
  })
  const [favs, setFavs] = useState({})
  const [page, setPage] = useState(1)
  const [rerender, setRerender] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const callgetMyFavoritesService = async (limit, page) => {
    setIsLoading(true)
    const [
      {
        data: {
          me: { count, favorites },
        },
      },
      error,
    ] = await SongsService.getMyFavorites(limit, page)
    if (error) {
      alert('Could not fetch favorites')
      return setIsLoading(false)
    }
    setFavorites({
      count: count,
      data: favorites.map(favorite => ({
        ...favorite,
        metadata: JSON.parse(favorite.metadata),
      })),
    })
    setFavs(songIdReducer(favorites))
    setIsLoading(false)
  }

  const callDislikeService = async id => {
    const [data, err] = await SongsService.dislike(id)
    if (err) return alert('Could not dislike song')
    if (page === 1) return setRerender(prev => prev + 1)
    setPage(1)
  }

  useEffect(() => {
    callgetMyFavoritesService(limit, page)
  }, [page, rerender])

  return (
    <Grid container sx={{ minHeight: '90vh' }} alignItems="center">
      {isLoading ? (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Grid>
      ) : (
        favorites.data.map(favorite => (
          <React.Fragment key={favorite.id}>
            <Grid item xs={3} />

            <Grid item xs={6}>
              <Box m={2}>
                <Song
                  song={favorite.metadata}
                  favs={favs}
                  callDislikeService={callDislikeService}
                  callLikeService={() => {}}
                />
              </Box>
            </Grid>

            <Grid item xs={3} />
          </React.Fragment>
        ))
      )}
    </Grid>
  )
}
