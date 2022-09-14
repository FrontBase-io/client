import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { findLast } from 'lodash'
import { useState, useContext, useEffect } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../App'
import AppPagerCanvas from '../../Components/AppPageCanvas'
import Icon from '../../Components/Icon'
import Desktop from '../../Pages/Desktop'
import { AppPageType, AppType } from '../../Types/App'
import styles from './appdetail.module.scss'

const AppDetail: React.FC<{ apps: AppType[] | undefined }> = ({ apps }) => {
  // Vars
  const [app, setApp] = useState<AppType>()
  const [appPages, setAppPages] = useState<AppPageType[]>([])

  // Hooks
  let { appId } = useParams()
  const { setCurrentApp } = useContext(AppContext)
  const navigate = useNavigate()

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
    <AppContext.Consumer>
      {({ currentPage }) => (
        <>
          <Routes>
            <Route
              path={`:pageId/*`}
              element={<AppPagerCanvas app={app} appPages={appPages} />}
            />
            <Route path="/" element={<Desktop />} />
          </Routes>

          <BottomNavigation
            showLabels
            value={currentPage?.key}
            className={styles.bottomnavigation}
          >
            {appPages.map((page) => (
              <BottomNavigationAction
                label={page.label}
                value={page.key}
                icon={<Icon icon={page.icon} />}
                key={page.key}
                onClick={() => navigate(`/${app?.key}/${page.key}`)}
              />
            ))}
          </BottomNavigation>
        </>
      )}
    </AppContext.Consumer>
  )
}

export default AppDetail
