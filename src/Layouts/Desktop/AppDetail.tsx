import AppBar from './AppBar'
import AppContent from './AppContent'
import { AppType } from '../../Types/App'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { findLast } from 'lodash'
import { AppContext } from '../../App'

const AppDetail: React.FC<{ apps: AppType[] | undefined }> = ({ apps }) => {
  // Vars
  const [app, setApp] = useState<AppType>()

  // Hooks
  let { appId } = useParams()
  const { setCurrentApp } = useContext(AppContext)

  // Lifecycle
  // Find the app in the array
  useEffect(() => {
    setApp(findLast(apps, (app) => app.key === appId))
  }, [apps, appId])
  // Mark the current app as the active app
  useEffect(() => {
    if (app && setCurrentApp) setCurrentApp(app)
    return () => {
      if (setCurrentApp) setCurrentApp(null)
    }
  }, [app])

  // Functions

  // UI
  return (
    <>
      <AppBar />
      <AppContent />
    </>
  )
}

export default AppDetail
