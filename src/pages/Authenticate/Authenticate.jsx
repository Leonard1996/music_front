import {
  Card,
  CardContent,
  Grid,
  Box,
  TextField,
  CardActions,
  Typography,
  Button,
} from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import { useState, useContext, useEffect } from 'react'
import { AuthenticateService } from './authenticate.service'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Auth'

const inputs = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    isLogin: false,
  },
]

export default function Authenticate() {
  const [isLogin, setIsLogin] = useState(true)
  const { setAccessToken, accessToken } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    const payload = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
      ...(!isLogin && {
        confirmPassword: event.target.elements.confirmPassword.value,
      }),
    }

    const action = isLogin ? 'login' : 'signup'
    const [result, error] = await AuthenticateService[action](payload)
    if (error)
      return alert(`${isLogin ? 'Could not log in!' : 'Could not sign up'}`)
    if (result && !isLogin) return alert('Signed up successfully')
    if (result) {
      localStorage.setItem('user', JSON.stringify(result.data.user))
      localStorage.setItem('accessToken', result.data.user.accessToken)
      setAccessToken(result.data.user.accessToken)
    }
  }

  useEffect(() => {
    if (accessToken) navigate('/home')
  }, [accessToken])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '90vh' }}
    >
      <Grid item xs={12}>
        <Card
          sx={{
            width: '500px',
            backgroundColor: '#eee',
            border: '2px solid #1976d2',
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={5} />
                <Grid item xs={2}>
                  <Box p={2}>
                    <MusicNoteIcon sx={{ transform: 'scale(2.0)' }} />
                  </Box>
                </Grid>

                {inputs
                  .filter(
                    input =>
                      input.isLogin === undefined || input.isLogin === isLogin,
                  )
                  .map(input => (
                    <Grid item xs={12} key={input.name}>
                      <Box p={2}>
                        <TextField
                          type={input.type}
                          name={input.name}
                          label={input.label}
                          fullWidth
                        ></TextField>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
              <Grid item xs={12}>
                <Box padding={2}>
                  <Button variant="outlined" type="submit">
                    {isLogin ? 'Log in' : 'Sign up'}
                  </Button>
                </Box>
              </Grid>
            </form>
            <CardActions>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    color="primary"
                    textAlign="center"
                    onClick={() => setIsLogin(prev => !prev)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {isLogin
                      ? "Don't have an account? Click here to sign up"
                      : 'Already have an account? Click here to log in'}
                  </Typography>
                </Grid>
              </Grid>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
