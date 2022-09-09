import { Link } from 'react-router-dom'
import { AppContext, ColorContext } from '../../App'
import AppIcon from '../../Components/AppIcon'
import Logo from '../../Components/Logo'
import { AppType } from '../../Types/App'
import styles from './styles.module.scss'

const MainBar: React.FC<{ apps?: AppType[] }> = ({ apps }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <ColorContext.Consumer>
      {({ primary }) => (
        <AppContext.Consumer>
          {({ currentApp }) => (
            <div
              className={styles.mainBar}
              style={{ backgroundColor: primary }}
            >
              <Link to="/" className={styles['primary-logo']}>
                <Logo />
              </Link>
              <div className={styles.apps}>
                {(apps ?? []).map((app) => (
                  <div
                    key={app._id}
                    className={
                      currentApp?.key === app.key
                        ? `${styles['active']} ${styles['app']}`
                        : styles['app']
                    }
                  >
                    <AppIcon app={app} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </AppContext.Consumer>
      )}
    </ColorContext.Consumer>
  )
}

export default MainBar
