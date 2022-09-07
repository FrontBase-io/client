import { ColorContext } from '../../App'
import styles from './styles.module.scss'
import AppHeader from '../../Components/AppHeader'

const AppContent: React.FC = () => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <ColorContext.Consumer>
      {({ primary, secondary }) => (
        <div className={styles.appContent}>
          <div
            className={styles.background}
            style={{ backgroundColor: primary }}
          />
          <AppHeader />
          <div className={styles.content}>App content</div>
        </div>
      )}
    </ColorContext.Consumer>
  )
}

export default AppContent
