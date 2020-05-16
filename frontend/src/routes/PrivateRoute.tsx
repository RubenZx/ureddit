import React from 'react'
import { Navigate, Route, RouteProps } from 'react-router'
import { LocalStorageService } from '../services/LocalStorage'

const PrivateRoute = (props: RouteProps) =>
  LocalStorageService.isUserLoggedIn ? (
    <Route {...props} />
  ) : (
    <Navigate to="/" />
  )

export default PrivateRoute
