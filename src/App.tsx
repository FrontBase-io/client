import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import UserType from './Types/User'
import socket from './Utils/Socket'

import {
  Snackbar,
  Alert,
  ThemeProvider,
  createTheme,
  Hidden,
} from '@mui/material'

import Loading from './Components/Loading'
import MobileLayout from './Layouts/Mobile/Layout'
import Login from './Pages/Login'

import ServerSetup from './Pages/ServerSetup'
import DesktopLayout from './Layouts/Desktop/Layout'
import { AppPageType, AppType } from './Types/App'
import { getHex } from './Utils/Color'

interface AppbarType {
  label: string
}

// Global context
export const ColorContext = createContext({
  primary: '#00bcd4',
  secondary: '#00bcd4',
})
export const AppContext = createContext<{
  currentApp?: AppType | null | undefined
  setCurrentApp?: ((app: AppType | null) => void) | null
  currentPage?: AppPageType | null | undefined
  setCurrentPage?: ((page: AppPageType | null) => void) | null
  appBar?: AppbarType | null | undefined
  setAppBar?: ((page: AppbarType | null) => void) | null
}>({
  currentApp: null,
  setCurrentApp: null,
  currentPage: null,
  setCurrentPage: null,
  appBar: null,
  setAppBar: null,
})

function App() {
  // Vars
  const [user, setUser] = useState<UserType | null | undefined>(undefined)
  const [connected, setConnected] = useState(false)
  const [serverIsReady, setServerIsReady] = useState(true)
  const { t } = useTranslation()
  const [primary, setPrimaryColor] = useState('#4874a8')
  const [secondary, setSecondaryColor] = useState('#00bcd4')
  // Context vars
  const [currentApp, setCurrentApp] = useState<AppType | null>()
  const [currentPage, setCurrentPage] = useState<
    AppPageType | null | undefined
  >()
  const [appBar, setAppBar] = useState<AppbarType | null>()
  const [colorMode, setColorMode] = useState<'dark' | 'light'>('dark')

  const handleSetCurrentApp = (app: AppType | null) => {
    let newColor = '#4874a8'
    if (app) {
      newColor = getHex(app.color)
    }
    setPrimaryColor(newColor)

    // Set theme color tag
    var metaThemeColor = document.querySelector('meta[name=theme-color]')!
    metaThemeColor.setAttribute('content', newColor)

    setCurrentApp(app)
  }

  // Lifecycle
  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true)

      // If the server is not set-up, we show the onboarding
      socket.on('server-setup', () => setServerIsReady(false))

      // If something is wrong with our authentication, we show the login page to get a new JWT token
      socket.on('authenticationError', () => setUser(null))

      // When everything is fine with our authentication, we're ready to go and render the lay-out.
      socket.on('authenticated', (receivedUser: UserType) =>
        setUser(receivedUser)
      )
    })
    socket.on('disconnect', () => setConnected(false))
  }, [])

  // UI

  return (
    <ColorContext.Provider value={{ primary, secondary }}>
      <AppContext.Provider
        value={{
          currentApp,
          setCurrentApp: handleSetCurrentApp,
          currentPage,
          setCurrentPage,
          appBar,
          setAppBar,
        }}
      >
        <BrowserRouter>
          <ThemeProvider
            theme={createTheme({
              palette: {
                mode: colorMode,
                primary: {
                  main: primary,
                },
              },
            })}
          >
            {serverIsReady ? (
              user === undefined ? (
                <Loading />
              ) : user ? (
                <>
                  <Hidden mdUp>
                    <MobileLayout />
                  </Hidden>
                  <Hidden mdDown>
                    <DesktopLayout />
                  </Hidden>
                </>
              ) : (
                <Login />
              )
            ) : (
              <ServerSetup />
            )}
            <Snackbar open={!connected}>
              <Alert severity="info">{t('system.connection.connecting')}</Alert>
            </Snackbar>
          </ThemeProvider>
        </BrowserRouter>
      </AppContext.Provider>
    </ColorContext.Provider>
  )
}

export default App
