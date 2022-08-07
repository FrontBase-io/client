import { ColorContext } from '../../App'
import Logo from '../../Components/Logo'
import styles from './styles.module.scss'

const MainBar: React.FC = () => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <ColorContext.Consumer>
      {({ primary, secondary }) => (
        <div className={styles.mainBar} style={{ backgroundColor: primary }}>
          <Logo />
        </div>
      )}
    </ColorContext.Consumer>
  )
}

export default MainBar
