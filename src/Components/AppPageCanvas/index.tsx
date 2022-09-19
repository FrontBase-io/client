import { AppPageType, AppType } from '../../Types/App'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { findLast } from 'lodash'
import { AppContext } from '../../App'

import RenderAppPage from './RenderAppPage'
import Loading from '../Loading'

const AppPagerCanvas: React.FC<{ app?: AppType; appPages: AppPageType[] }> = ({
  app,
  appPages,
}) => {
  // Vars
  const [page, setPage] = useState<AppPageType>()
  const { pageId } = useParams()

  // Hooks
  const { setAppBar, setCurrentPage } = useContext(AppContext)

  // Lifecycle
  useEffect(() => {
    setPage(findLast(appPages, (p) => p.key === pageId))
  }, [pageId, app, appPages])
  useEffect(() => {
    if (page) {
      if (setAppBar) setAppBar({ label: page.label })
      if (setCurrentPage) setCurrentPage(page)
    }
    return () => {
      if (setAppBar) setAppBar(null)
      if (setCurrentPage) setCurrentPage(null)
    }
  }, [page])

  // Functions

  // UI
  return (
    <>
      {!page?.content?.type ? (
        <Loading />
      ) : page.content.type === 'code' ? (
        <RenderAppPage app={app!} page={page} />
      ) : (
        <>Layout</>
      )}
    </>
  )
}

export default AppPagerCanvas
