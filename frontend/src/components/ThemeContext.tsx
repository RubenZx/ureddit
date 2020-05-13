import { useTheme as zeitTheme, ZEITUIProvider } from '@zeit-ui/react'
import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(
  {} as { themeType: string; switchTheme: () => void },
)

const ThemeProvider: React.FC = ({ children }) => {
  const [themeType, setThemeType] = useState('light')

  const switchTheme = () => {
    setThemeType((lastThemeType) =>
      lastThemeType === 'dark' ? 'light' : 'dark',
    )
  }

  return (
    <ThemeContext.Provider value={{ themeType, switchTheme }}>
      <ZEITUIProvider theme={{ type: themeType }}>{children}</ZEITUIProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const zeit = zeitTheme()
  const context = useContext(ThemeContext)
  return { ...zeit, ...context }
}

export default ThemeProvider
