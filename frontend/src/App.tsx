import { CSSBaseline, ZEITUIProvider } from '@zeit-ui/react'
import React from 'react'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <ZEITUIProvider>
      <CSSBaseline />
      <Navbar />
    </ZEITUIProvider>
  )
}

export default App
