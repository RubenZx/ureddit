import React from 'react'
import { Navigate, Route, RouteProps } from 'react-router'
import { useAuth } from '../services/Auth'

const NotLoggedRoute = (props: RouteProps) => {
  const { isUserLoggedIn } = useAuth()

  return isUserLoggedIn ? <Navigate to="/" /> : <Route {...props} />
}

export default NotLoggedRoute
