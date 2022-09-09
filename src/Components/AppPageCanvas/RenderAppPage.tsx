import { AppPageType } from '../../Types/App'
import { AppType } from '../../Types/App'
import { FC, lazy, useEffect, useState } from 'react'
import UI, { UIType } from './UI'
import Loading from '../Loading'

const RenderAppPage: React.FC<{ app: AppType; page: AppPageType }> = ({
  app,
  page,
}) => {
  // Vars
  const [AppPageComponent, setAppPageComponent] = useState<FC<{ UI: UIType }>>()

  // Lifecycle
  useEffect(() => {
    setAppPageComponent(
      lazy(() => import(`../../Apps/${app.key}/Pages/${page.key}/index`))
    )
    // import('../../Apps/settings/Pages/models/index').then((component) => {
    //   setAppPageComponent(component.default)
    // })
  }, [page, app])

  // Functions
  ///Apps/{app.key}/Pages/{page.key}/index.tsx

  // UI
  return <>{AppPageComponent ? <AppPageComponent UI={UI} /> : <Loading />}</>
}

export default RenderAppPage
