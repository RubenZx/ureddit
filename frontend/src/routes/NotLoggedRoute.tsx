import React from 'react'
import { Navigate, Route, RouteProps } from 'react-router'
import { LocalStorageService } from '../services/LocalStorage'

const NotLoggedRoute = (props: RouteProps) =>
  LocalStorageService.isUserLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <Route {...props} />
  )

export default NotLoggedRoute
