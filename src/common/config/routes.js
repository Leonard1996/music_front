import React from 'react'
import Authenticate from '../../pages/Authenticate/Authenticate'
import Favorites from '../../pages/Favorites/Favorites'
import Home from '../../pages/Home/Home'
import Songs from '../../pages/Songs/Songs'

export const routes = [
  {
    name: 'Authenticate',
    path: '/',
    private: false,
    element: <Authenticate />,
  },
  {
    name: 'Home',
    path: '/home',
    private: true,
    element: <Home />,
  },
  {
    name: 'Songs',
    path: '/songs',
    private: true,
    element: <Songs/>,
  },
  {
    name: 'Favorites',
    path: '/my-favorites',
    private: true,
    element: <Favorites/>,
  },
]