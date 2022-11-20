import { useContext, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { AuthContext } from '../../context/Auth'

const pointerStyles = {
  cursor: 'pointer',
}

export default function Navbar() {
  const navigate = useNavigate()
  const { accessToken, setAccessToken } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem('user', null)
    localStorage.removeItem('accessToken', null)
    setAccessToken(null)
  }

  useEffect(() => {
    if (!accessToken) navigate('/')
  }, [accessToken])

  const links = [
    {
      label: 'Search songs',
      callback: () => navigate('/home'),
    },
    {
      label: 'My favorites',
      callback: () => navigate('/my-favorites'),
    },
    {
      label: 'Logout',
      callback: () => handleLogout(),
    },
  ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            sx={pointerStyles}
            onClick={() => navigate('/')}
          >
            MusicApp
          </Typography>
          {accessToken && (
            <Box display="flex">
              {links.map(link => (
                <Box paddingX={1} key={link.label}>
                  <Typography sx={pointerStyles} onClick={link.callback}>
                    {link.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
