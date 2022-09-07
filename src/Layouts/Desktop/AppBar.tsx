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
import { Link } from 'react-router-dom'

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
        <div className={styles.appBar} style={{ width: expanded ? 300 : 49 }}>
          <div
            onClick={() => setExpanded(!expanded)}
            className={styles.sizeToggle}
            style={{ left: expanded ? 360 : 110 }}
          />
          <div
            className={styles.appbarHeader}
            onClick={() => setExpanded(!expanded)}
            style={{ color: primary, borderBottom: `1px solid ${primary}` }}
          >
            <Icon
              icon={app?.icon}
              style={{ marginRight: 20, marginLeft: expanded ? 0 : 110 }}
            />
            <Typography variant="h5">{app?.name}</Typography>
          </div>
          <List>
            {(app?.pages ?? []).map((page) => (
              <Link to={`/${app?.key}/${page.key}`} key={page.key}>
                <ListItem button>
                  <ListItemIcon>
                    <Icon icon={page.icon} />
                  </ListItemIcon>
                  <ListItemText primary={page.label} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      )}
    </ColorContext.Consumer>
  )
}

export default AppBar
