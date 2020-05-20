import { CSSBaseline } from '@zeit-ui/react'
import React, { useEffect } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import NotFound from './components/NotFound'
import NewPost from './components/post/NewPost'
import Posts from './components/post/Posts'
import Profile from './components/profile/Profile'
import ResetPassword from './components/ResetPassword'
import ThemeProvider from './components/ThemeContext'
import ValidateAccount from './components/ValidateAccount'
import { history } from './routes/history'
import NotLoggedRoute from './routes/NotLoggedRoute'
import PrivateRoute from './routes/PrivateRoute'
import { refreshToken } from './services/api'

const App = () => {
  useEffect(() => {
    refreshToken()
  }, [])

  return (
    <ThemeProvider>
      <Router history={history}>
        <CSSBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <PrivateRoute path="/submit" element={<NewPost />} />
          <NotLoggedRoute
            path="/validate-account"
            element={<ValidateAccount />}
          />
          <NotLoggedRoute
            path="/reset-password/:code"
            element={<ResetPassword />}
          />
          <NotLoggedRoute
            path="/validate-account/:validationCode"
            element={<ValidateAccount />}
          />
          <Route path="/u/:username" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
