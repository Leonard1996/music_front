import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/Auth'

const PublicRoute = ({ children }) => {
  let location = useLocation()
  const { accessToken } = useContext(AuthContext)

  if (accessToken) {
    return <Navigate to={'/home'} state={{ from: location }} />
  }

  return <>{children}</>
}

export default PublicRoute
