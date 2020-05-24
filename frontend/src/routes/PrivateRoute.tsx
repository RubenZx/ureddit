import React from 'react'
import { Navigate, Route, RouteProps } from 'react-router'
import { useAuth } from '../services/Auth'

const PrivateRoute = (props: RouteProps) => {
  const { isUserLoggedIn } = useAuth()

  return isUserLoggedIn ? <Route {...props} /> : <Navigate to="/" />
}

export default PrivateRoute
