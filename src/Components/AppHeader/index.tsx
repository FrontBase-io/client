import { AppContext } from '../../App'
import styles from './styles.module.scss'

const AppHeader: React.FC = () => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <AppContext.Consumer>
      {({ appBar }) => (
        <div className={styles.appHeader}>{appBar?.label ?? 'FrontBase'}</div>
      )}
    </AppContext.Consumer>
  )
}

export default AppHeader
