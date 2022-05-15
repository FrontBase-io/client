import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './Styles/Styles.scss'

import PrimeReact from 'primereact/api'
import { Toast } from 'primereact/toast'

import socket from './Utils/Socket'

import { useEffect, useRef, useState } from 'react'

import UserType from './Types/User'

// Pages
import Login from './Pages/LogIn'
import Loading from './Components/Loading'
import ServerSetup from './Pages/ServerSetup'
import DesktopLayout from './Pages/App/Desktop'
import MobileLayout from './Pages/App/Mobile'
import { BrowserRouter } from 'react-router-dom'
// Dynamic import
import(
  `./Styles/Prime/Frontbase-${
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }.css`
)

PrimeReact.ripple = true

function App() {
  // Vars
  const [user, setUser] = useState<UserType | null | undefined>(undefined)
  const [serverIsReady, setServerIsReady] = useState(true)
  const toast = useRef(null)
  const [device, setDevice] = useState<'desktop' | 'mobile'>(
    window.innerWidth > 800 ? 'desktop' : 'mobile'
  )

  // Functions
  const showConnectionWarning = () => {
    //@ts-ignore
    toast.current!.show({
      severity: 'warn',
      summary: 'Connection paused',
      detail: 'Your device is offline. Hold on while we wait for a connection.',
      sticky: true,
      closable: false,
    })
  }

  // Lifecycle
  // Handle app-level interaction with server
  useEffect(() => {
    // Show the connection warning until we have a socket connection
    showConnectionWarning()

    // When the socket is connected, hide the warning
    socket.on('connect', () => {
      // @ts-ignore Hide the warning
      toast.current!.clear()

      // If the server is not set-up, we show the onboarding
      socket.on('server-setup', () => setServerIsReady(false))

      // If something is wrong with our authentication, we show the login page to get a new JWT token
      socket.on('authenticationError', () => setUser(null))

      // When everything is fine with our authentication, we're ready to go and render the lay-out.
      socket.on('authenticated', (receivedUser) => setUser(receivedUser))
    })

    // Show a warning when disconnected from the server.
    socket.on('disconnect', () => showConnectionWarning())

    // Track the window's width
    const handleResizeWindow = () =>
      setDevice(window.innerWidth > 800 ? 'desktop' : 'mobile')

    window.addEventListener('resize', handleResizeWindow)
    return () => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [])

  // UI
  return (
    <BrowserRouter>
      {serverIsReady ? (
        user === undefined ? (
          <Loading />
        ) : user ? (
          device === 'mobile' ? (
            <MobileLayout />
          ) : (
            <DesktopLayout />
          )
        ) : (
          <Login />
        )
      ) : (
        <ServerSetup />
      )}
      <Toast ref={toast} position="bottom-right" />
    </BrowserRouter>
  )
}

export default App
