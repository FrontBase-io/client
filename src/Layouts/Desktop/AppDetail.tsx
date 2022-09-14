import AppBar from './AppBar'
import AppContent from './AppContent'
import { AppPageType, AppType } from '../../Types/App'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { findLast } from 'lodash'
import { AppContext } from '../../App'

const AppDetail: React.FC<{ apps: AppType[] | undefined }> = ({ apps }) => {
  // Vars
  const [app, setApp] = useState<AppType>()
  const [appPages, setAppPages] = useState<AppPageType[]>([])
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

    if (app) {
      if (app.dynamic_pages) {
        import(`../../Apps/${app.code}/App.ts`).then((ac) => {
          const appClass = new ac.default()
          appClass
            .getPages()
            .then((newPages: AppPageType[]) => setAppPages(newPages))
        })
      } else {
        if (app.pages) setAppPages(app.pages)
      }
    }

    return () => {
      if (setCurrentApp) setCurrentApp(null)
    }
  }, [app])

  // Functions

  // UI
  return (
    <>
      <AppBar app={app} appPages={appPages} />
      <AppContent app={app} appPages={appPages} />
    </>
  )
}

export default AppDetail
