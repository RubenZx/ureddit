import { CSSBaseline } from '@zeit-ui/react'
import React, { useEffect } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import NotFound from './components/NotFound'
import NewPost from './components/post/NewPost'
import Posts from './components/post/Posts'
import Profile from './components/Profile'
import ThemeProvider from './components/ThemeContext'
import ValidateAccount from './components/ValidateAccount'
import { history } from './routes/history'
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
          <Route path="/validate-account" element={<ValidateAccount />} />
          <Route
            path="/validate-account/:validationCode"
            element={<ValidateAccount />}
          />
          <Route path="/u/:userName" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
