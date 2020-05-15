import { CSSBaseline } from '@zeit-ui/react'
import React, { useEffect } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import NewPost from './components/NewPost'
import NotFound from './components/NotFound'
import ThemeProvider from './components/ThemeContext'
import ValidateAccount from './components/ValidateAccount'
import { history } from './routes/history'
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
          <Route path="/" element={<></>} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/validate-account" element={<ValidateAccount />} />
          <Route
            path="/validate-account/:validationCode"
            element={<ValidateAccount />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
