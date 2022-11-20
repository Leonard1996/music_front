import { Grid, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Song from './Song'
import { SongsService } from './songs.service'
import CircularProgress from '@mui/material/CircularProgress'
import songIdReducer from '../../common/helpers/song.id.reducer'

export default function Songs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [songs, setSongs] = useState([])
  const [favs, setFavs] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const callSongsService = async keyword => {
    setIsLoading(true)
    const [songsResult, favoritesResult] = await Promise.allSettled([
      SongsService.getSongs(keyword),
      SongsService.getMyFavorites(),
    ])

    if (songsResult.value[1]) {
      alert('Something went wrong!')
      return setIsLoading(false)
    }
    const favIds = songIdReducer(favoritesResult.value[0].data.me.favorites)
    setSongs(songsResult.value[0].data.songs)
    setFavs(favIds)
    setIsLoading(false)
  }

  const callLikeService = async payload => {
    const [data, err] = await SongsService.like(payload)
    if (err) return alert('Could not like song')

    const [result, error] = await SongsService.getMyFavorites()
    console.log(result.data.me.favorites)
    const favIds = songIdReducer(result.data.me.favorites)
    setFavs(favIds)
  }

  const callDislikeService = async id => {
    console.log(id)
    const [data, err] = await SongsService.dislike(id)
    if (err) return alert('Could not dislike song')

    const [result, error] = await SongsService.getMyFavorites()
    const favIds = songIdReducer(result.data.me.favorites)
    setFavs(favIds)
  }

  useEffect(() => {
    callSongsService(searchParams.get('keyword'))
  }, [])

  return (
    <Grid container sx={{ minHeight: '90vh' }} alignItems="center">
      {isLoading ? (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Grid>
      ) : (
        songs.map(song => (
          <React.Fragment key={song.id}>
            <Grid item xs={3} />

            <Grid item xs={6}>
              <Box m={2}>
                <Song
                  song={song}
                  favs={favs}
                  callDislikeService={callDislikeService}
                  callLikeService={callLikeService}
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
