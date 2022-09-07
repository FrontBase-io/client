import { ColorContext } from '../../App'
import styles from './styles.module.scss'
import AppHeader from '../../Components/AppHeader'
import { Route, Routes } from 'react-router-dom'
import { AppType } from '../../Types/App'
import AppCanvas from '../../Components/AppCanvas'

const AppContent: React.FC<{ app?: AppType }> = ({ app }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <ColorContext.Consumer>
      {({ primary }) => (
        <div className={styles.appContent} style={{ width: '30%' }}>
          <div
            className={styles.background}
            style={{ backgroundColor: primary }}
          />
          <AppHeader />
          <div className={styles.content}>
            <Routes>
              <Route path={`:pageId`} element={<AppCanvas app={app} />} />
            </Routes>
          </div>
        </div>
      )}
    </ColorContext.Consumer>
  )
}

export default AppContent
