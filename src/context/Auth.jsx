import React, { useState } from 'react'

export const AuthContext = React.createContext(null)

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  )

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}
