import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { routes } from '../config/routes'

const Navigator = () => {
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            element={
              route.private ? (
                <PrivateRoute pageName={route.name}>
                  {route.element}
                </PrivateRoute>
              ) : (
                <PublicRoute>{route.element}</PublicRoute>
              )
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default Navigator
