import { Link } from 'react-router-dom'
import { ColorContext } from '../../App'
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
      {({ primary, secondary }) => (
        <div className={styles.mainBar} style={{ backgroundColor: primary }}>
          <Link to="/">
            <Logo />
          </Link>
          {(apps ?? []).map((app) => (
            <Link to={`/${app.key}`} key={app._id}>
              {app.name}
            </Link>
          ))}
        </div>
      )}
    </ColorContext.Consumer>
  )
}

export default MainBar
