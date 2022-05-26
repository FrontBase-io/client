import { find } from 'lodash'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Components/Loading'
import { AppType, PageType } from '../Types/Apps'
import appService from '../Utils/AppService'
import { useGlobal } from 'reactn'
import DesktopApp from '../Pages/App/Desktop/App'
import MobileApp from '../Pages/App/Mobile/App'

const App: React.FC<{ apps: AppType[]; size: 'desktop' | 'mobile' }> = ({
  apps,
  size,
}) => {
  // Vars
  const params = useParams()
  //@ts-ignore
  const [, setCurrentApp] = useGlobal('currentApp')
  const [app, setApp] = useState<AppType | undefined>()
  const [pages, setPages] = useState<PageType[] | null>()
  const [error, setError] = useState<string | null>()

  useEffect(() => {
    setApp(find(apps, (app) => app.key === params.appId))
    setPages(null)
    setError(null)
    appService.app = app
    //@ts-ignore
    setCurrentApp(params.appId)
  }, [params.appId, apps, app, setCurrentApp])
  // Manage app lifecycle
  useEffect(() => {
    let appInstance: any
    if (app) {
      import(`../Apps/${app.provider}/${app.key}/App.ts`).then(
        async ({ App }) => {
          if (App) appInstance = new App(appService)
          if (appInstance) {
            // onAppStart hook
            if (appInstance && appInstance.onAppStart) appInstance.onAppStart()

            // Get the pages from the app
            await appInstance.onGetPages((pages: PageType[]) => setPages(pages))
          }
        },
        () => {
          setError('Not found')
          console.error(`Error loading app ${app.key} - not found`)
        }
      )
    }

    return () => {
      // onAppStop hook
      if (appInstance && appInstance.onAppStop) {
        appInstance.onAppStop()
      }
    }
  }, [app])

  return error ? (
    <>
      <strong>Error</strong> Could not load app: {error}
    </>
  ) : app && pages ? (
    size === 'desktop' ? (
      <DesktopApp pages={pages} app={app} />
    ) : (
      <MobileApp pages={pages} app={app} />
    )
  ) : (
    <Loading />
  )
}
export default App
