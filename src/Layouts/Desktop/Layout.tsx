import styles from './styles.module.scss'

import AppBar from './AppBar'
import AppContent from './AppContent'
import MainBar from './MainBar'

const DesktopLayout: React.FC = () => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <div className={styles.desktop}>
      <MainBar />
      <AppBar />
      <AppContent />
    </div>
  )
}

export default DesktopLayout
