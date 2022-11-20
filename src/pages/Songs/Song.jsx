import { CardContent, Typography, Grid, Card, Button } from '@mui/material'

export default function Song({
  song,
  callDislikeService,
  callLikeService,
  favs,
}) {
  const {
    id,
    album: { name: albumName, album_id: albumId },
    artists,
    thumbnail,
    name,
    duration,
  } = song
  return (
    <Card
      sx={{
        width: '550px',
        height: '120px',
        padding: '16px',
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <img src={thumbnail} loading="lazy" height="100px" width="auto" />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={4}>
            <Typography>{name}</Typography>
            <Typography>Album: {albumName}</Typography>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <Grid container rowGap={1}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  disabled={favs[id]}
                  onClick={() =>
                    callLikeService({
                      artistId: artists[0].artist_id,
                      songId: id,
                      albumId,
                      metadata: JSON.stringify(song),
                    })
                  }
                >
                  Like
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={!favs[id]}
                  onClick={() => callDislikeService(favs[id])}
                >
                  Dislike
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  {Math.floor(duration / 60)}m:{(duration % 60).toFixed(0)}s
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
