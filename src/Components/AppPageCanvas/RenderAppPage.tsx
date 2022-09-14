import { AppPageType } from '../../Types/App'
import { AppType } from '../../Types/App'
import { FC, lazy, useEffect, useState } from 'react'
import UI, { UIType } from './UI'
import Loading from '../Loading'
import Helpers, { HelpersType } from './Helpers'

const RenderAppPage: React.FC<{ app: AppType; page: AppPageType }> = ({
  app,
  page,
}) => {
  // Vars
  const [AppPageComponent, setAppPageComponent] =
    useState<FC<{ UI: UIType; helpers: HelpersType }>>()

  // Lifecycle
  useEffect(() => {
    setAppPageComponent(
      lazy(
        () =>
          import(`../../Apps/${app.key}/Pages/${page.content.pageKey}/index`)
      )
    )
    // import('../../Apps/settings/Pages/models/index').then((component) => {
    // import Helpers from './Helpers';
    // setAppPageComponent(component.default)
    // })
  }, [page, app])

  // Functions
  ///Apps/{app.key}/Pages/{page.key}/index.tsx

  // UI
  return (
    <>
      {AppPageComponent ? (
        <AppPageComponent UI={UI} helpers={Helpers} {...page.props} />
      ) : (
        <Loading />
      )}
    </>
  )
}

export default RenderAppPage
