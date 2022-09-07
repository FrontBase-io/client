import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { AppType } from '../../Types/App'
import { ColorContext } from '../../App'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import Icon from '../../Components/Icon'

const AppBar: React.FC<{ app?: AppType }> = ({ app }) => {
  // Vars
  const [expanded, setExpanded] = useState<Boolean>(false)

  // Lifecycle
  useEffect(() => {
    setExpanded(true)
  }, [app])
  // Functions

  // UI
  return (
    <ColorContext.Consumer>
      {({ primary }) => (
        <div className={styles.appBar} style={{ width: expanded ? 300 : 60 }}>
          <div
            onClick={() => setExpanded(!expanded)}
            className={styles.sizeToggle}
            style={{ left: expanded ? 360 : 120 }}
          />
          <div
            className={styles.appbarHeader}
            onClick={() => setExpanded(!expanded)}
            style={{ color: primary, borderBottom: `1px solid ${primary}` }}
          >
            <Icon
              icon={app?.icon}
              style={{ marginRight: 20, marginLeft: expanded ? 0 : 100 }}
            />
            <Typography
              variant="h5"
              style={{
                opacity: expanded ? 1 : 0,
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {app?.name}
            </Typography>
          </div>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Icon icon="compass" />
              </ListItemIcon>
              <ListItemText primary="Page" />
            </ListItem>
          </List>
        </div>
      )}
    </ColorContext.Consumer>
  )
}

export default AppBar
