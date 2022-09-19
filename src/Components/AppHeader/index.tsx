import { IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import Icon from '../Icon'
import styles from './styles.module.scss'

const AppHeader: React.FC = () => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <AppContext.Consumer>
      {({ appBar }) => (
        <div className={styles.appHeader}>
          {appBar?.up && (
            <Link to={appBar?.up}>
              <IconButton>
                <Icon icon="chevron-left" />
              </IconButton>
            </Link>
          )}
          <Typography variant="h6" noWrap component="div" style={{ flex: 1 }}>
            {appBar?.label ?? 'FrontBase'}
          </Typography>
          {appBar?.actions &&
            appBar.actions.map((action) => (
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
                onClick={action.onClick}
                title={action.label}
                key={action.key}
              >
                <Icon icon={action.icon} />
              </IconButton>
            ))}
        </div>
      )}
    </AppContext.Consumer>
  )
}

export default AppHeader
