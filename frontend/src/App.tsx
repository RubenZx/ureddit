import { CSSBaseline } from '@zeit-ui/react'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import NewPost from './components/NewPost'
import ThemeProvider from './components/ThemeContext'

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <CSSBaseline />
        <Navbar />
        <Routes>
          <Route path="/newpost" element={<NewPost />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
