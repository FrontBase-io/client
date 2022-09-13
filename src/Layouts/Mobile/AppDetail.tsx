import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { findLast } from 'lodash'
import { useState, useContext, useEffect } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../App'
import AppPagerCanvas from '../../Components/AppPageCanvas'
import Icon from '../../Components/Icon'
import Desktop from '../../Pages/Desktop'
import { AppType } from '../../Types/App'
import styles from './appdetail.module.scss'

const AppDetail: React.FC<{ apps: AppType[] | undefined }> = ({ apps }) => {
  // Vars
  const [app, setApp] = useState<AppType>()

  // Hooks
  let { appId } = useParams()
  const { setCurrentApp } = useContext(AppContext)
  const [value, setValue] = useState(app?.pages[0].key)
  const navigate = useNavigate()

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
    <AppContext.Consumer>
      {({ currentPage }) => (
        <>
          <Routes>
            <Route path={`:pageId/*`} element={<AppPagerCanvas app={app} />} />
            <Route path="/" element={<Desktop />} />
          </Routes>

          <BottomNavigation
            showLabels
            value={currentPage?.key}
            className={styles.bottomnavigation}
          >
            {(app?.pages ?? []).map((page) => (
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
