import { Routes, Route, useParams } from 'react-router-dom'

import { AppType } from '../Types/Apps'
import { find } from 'lodash'
import { useEffect, useState } from 'react'
import Loading from '../Components/Loading'
import appService from '../Utils/AppService'
import { useGlobal } from 'reactn'

const AppRoutes: React.FC<{ apps: AppType[] }> = ({ apps }) => {
  // Vars

  // Lifecycle

  // UI
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":appId" element={<App apps={apps} />} />
    </Routes>
  )
}

export default AppRoutes

const App: React.FC<{ apps: AppType[] }> = ({ apps }) => {
  // Vars
  const params = useParams()
  //@ts-ignore
  const [, setCurrentApp] = useGlobal('currentApp')
  const [app, setApp] = useState<AppType | undefined>(
    find(apps, (app) => app.key === params.appId)
  )

  useEffect(() => {
    setApp(find(apps, (app) => app.key === params.appId))
    appService.app = app
    //@ts-ignore
    setCurrentApp(params.appId)
  }, [params.appId, apps])

  return app ? <>{app.name}</> : <Loading />
}

const Home: React.FC = () => {
  //@ts-ignore
  const [, setCurrentApp] = useGlobal('currentApp')

  useEffect(() => {
    //@ts-ignore
    setCurrentApp(undefined)
  })
  return <>Home</>
}
