import { createContext, useEffect, useState } from 'react'
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
} from '@mui/material'

import Loading from './Components/Loading'
import MobileLayout from './Layouts/Mobile/Layout'
import Login from './Pages/Login'

import ServerSetup from './Pages/ServerSetup'
import DesktopLayout from './Layouts/Desktop/Layout'
import { AppPageType, AppType } from './Types/App'
import { getHex } from './Utils/Color'
import TextInput from './Components/Inputs/Text'
import CheckboxInput from './Components/Inputs/Checkbox'

import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch' // or any other pipeline

interface AppbarType {
  label: string
}

export interface DialogInputType {
  label: string
  key: string
  type?: 'text' | 'number' | 'boolean' | 'select'
}
interface DialogActionType {
  label: string
  onClick?: (form: { [key: string]: any }) => void
}
interface DialogType {
  show: boolean
  title?: string
  text?: string
  form?: DialogInputType[]
  actions?: DialogActionType[]
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
export const DialogContext = createContext<{
  dialog: DialogType | null
  setDialog: (dialog: DialogType) => void
}>({
  dialog: null,
  setDialog: () => {},
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
  const [colorMode, setColorMode] = useState<'dark' | 'light'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
  // Dialog
  const [dialog, setDialog] = useState<DialogType>({ show: false })
  const [dialogFormContent, setDialogFormContent] = useState<{
    [key: string]: any
  }>({})

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

    // Listen to dark mode changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) =>
        setColorMode(e.matches ? 'dark' : 'light')
      )
  }, [])

  // UI

  return (
    <DndProvider options={HTML5toTouch}>
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
          <DialogContext.Provider value={{ dialog, setDialog }}>
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
                  <Alert severity="info">
                    {t('system.connection.connecting')}
                  </Alert>
                </Snackbar>
              </ThemeProvider>
            </BrowserRouter>
            <Dialog
              open={dialog.show}
              onClose={() => setDialog({ ...dialog, show: false })}
            >
              {dialog.title && <DialogTitle>{dialog.title}</DialogTitle>}
              <DialogContent>
                <>
                  {dialog.text && (
                    <DialogContentText>{dialog.text}</DialogContentText>
                  )}
                  {dialog.form && (
                    <Grid container spacing={3}>
                      {dialog.form.map((formItem) => (
                        <Grid item xs={12} key={formItem.key}>
                          {(formItem.type === 'text' || !formItem.type) && (
                            <TextInput
                              label={formItem.label}
                              value={dialogFormContent[formItem.key] ?? ''}
                              onChange={(newValue) => {
                                setDialogFormContent({
                                  ...dialogFormContent,
                                  [formItem.key]: newValue,
                                })
                              }}
                            />
                          )}
                          {formItem.type === 'boolean' && (
                            <CheckboxInput
                              label={formItem.label}
                              value={dialogFormContent[formItem.key] ?? false}
                              onChange={(newValue) => {
                                setDialogFormContent({
                                  ...dialogFormContent,
                                  [formItem.key]: newValue,
                                })
                              }}
                            />
                          )}
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </>
              </DialogContent>
              {dialog.actions && (
                <DialogActions>
                  {dialog.actions.map((dialogAction, index) => (
                    <Button
                      key={`dialog-action-${index}`}
                      onClick={() => {
                        dialogAction.onClick &&
                          dialogAction.onClick(dialogFormContent)
                        setDialogFormContent({})
                        setDialog({ ...dialog, show: false })
                      }}
                      autoFocus
                    >
                      {dialogAction.label}
                    </Button>
                  ))}
                </DialogActions>
              )}
            </Dialog>
          </DialogContext.Provider>
        </AppContext.Provider>
      </ColorContext.Provider>
    </DndProvider>
  )
}

export default App
