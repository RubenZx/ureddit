import { CSSBaseline } from '@zeit-ui/react'
import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import NotFound from './components/NotFound'
import NewPost from './components/post/NewPost'
import Posts from './components/post/Posts'
import PostWithComments from './components/post/PostWithComments'
import EditProfile from './components/profile/EditProfile'
import Profile from './components/profile/Profile'
import Settings from './components/profile/Settings'
import ResetPassword from './components/ResetPassword'
import ThemeProvider from './components/ThemeContext'
import ValidateAccount from './components/ValidateAccount'
import { routes } from './routes'
import { history } from './routes/history'
import NotLoggedRoute from './routes/NotLoggedRoute'
import PrivateRoute from './routes/PrivateRoute'
import { AuthProvider } from './services/Auth'

const App = () => {
  return (
    <ThemeProvider>
      <Router history={history}>
        <AuthProvider>
          <CSSBaseline />
          <Navbar />
          <Routes>
            <Route path={routes.home} element={<Posts />} />
            <Route path={routes.post} element={<PostWithComments />} />
            <PrivateRoute path={routes.submit} element={<NewPost />} />
            <PrivateRoute path={routes.settings} element={<Settings />} />
            <NotLoggedRoute
              path={routes.validateAccount}
              element={<ValidateAccount />}
            />
            <NotLoggedRoute
              path={routes.resetPassword}
              element={<ResetPassword />}
            />
            <NotLoggedRoute
              path={routes.validateWithCode}
              element={<ValidateAccount />}
            />
            <Route path={routes.profile} element={<Profile />} />
            <Route path={routes.editProfile} element={<EditProfile />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
