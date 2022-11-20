import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import Autosuggest from './Autosuggest'
import { HomeService } from './home.service'
export default function Home() {
  const [suggestions, setSuggestions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSuggestionsClick = async () => {
    if (isOpen) return
    setIsOpen(true)
    const [result, error] = await HomeService.getSuggestions()
    if (error) return alert('Could not fetch any suggestons')
    const songs = []
    for (const key in result.data.suggestions) {
      songs.push({
        timestamp: result.data.suggestions[key],
        name: key,
      })
    }

    setSuggestions(songs)
  }

  const handleGridClick = event => {
    if (!event.target.className.includes('Autosuggest_wrapper__container'))
      setIsOpen(false)
  }
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '90vh' }}
      onClick={handleGridClick}
    >
      <Grid item xs={12}>
        <Typography textAlign="center" variant="h6">
          What would you wish to listen to?
        </Typography>
        <Grid item xs={12}>
          <Autosuggest
            onClick={handleSuggestionsClick}
            suggestions={suggestions}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
