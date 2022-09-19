import { ColorContext } from '../../App'
import styles from './styles.module.scss'
import AppHeader from '../../Components/AppHeader'
import { Route, Routes } from 'react-router-dom'
import { AppPageType, AppType } from '../../Types/App'
import AppPagerCanvas from '../../Components/AppPageCanvas'

const AppContent: React.FC<{ app?: AppType; appPages: AppPageType[] }> = ({
  app,
  appPages,
}) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <ColorContext.Consumer>
      {({ primary }) => (
        <div className={styles.appContent}>
          <div
            className={styles.background}
            style={{ backgroundColor: primary }}
          />
          <AppHeader />
          <div className={styles.content}>
            <Routes>
              <Route
                path={`:pageId/*`}
                element={<AppPagerCanvas app={app} appPages={appPages} />}
              />
            </Routes>
          </div>
        </div>
      )}
    </ColorContext.Consumer>
  )
}

export default AppContent
