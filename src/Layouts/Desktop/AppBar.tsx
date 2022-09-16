import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { AppPageType, AppType } from '../../Types/App'
import { AppContext, ColorContext } from '../../App'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import Icon from '../../Components/Icon'
import { Link } from 'react-router-dom'

const AppBar: React.FC<{ app?: AppType; appPages: AppPageType[] }> = ({
  app,
  appPages,
}) => {
  // Vars
  const [expanded, setExpanded] = useState<boolean>(false)

  // Lifecycle
  useEffect(() => {
    setExpanded(true)
  }, [app])

  // Functions

  // UI
  return (
    <ColorContext.Consumer>
      {({ primary }) => (
        <AppContext.Consumer>
          {({ currentPage }) => (
            <div
              className={styles.appBar}
              style={{ width: expanded ? 250 : 49 }}
            >
              <div
                onClick={() => setExpanded(!expanded)}
                className={styles.sizeToggle}
                style={{ left: expanded ? 310 : 110 }}
              />
              <Link to={`/${app?.key}`}>
                <div
                  className={styles.appbarHeader}
                  style={{
                    color: primary,
                    borderBottom: `1px solid ${primary}`,
                  }}
                >
                  <Icon
                    icon={app?.icon}
                    style={{ marginRight: 20, marginLeft: expanded ? 0 : 110 }}
                  />
                  <Typography variant="h5">{app?.name}</Typography>
                </div>
              </Link>
              <List>
                {appPages?.map((page) => (
                  <Tooltip
                    title={page.label}
                    placement="right"
                    arrow
                    key={page.key}
                    disableHoverListener={expanded}
                  >
                    <Link to={`/${app?.key}/${page.key}`}>
                      <ListItemButton
                        selected={page.key === currentPage?.key}
                        onClick={() =>
                          page.key === currentPage?.key &&
                          setExpanded(!expanded)
                        }
                      >
                        <ListItemIcon
                          sx={
                            page.key === currentPage?.key
                              ? {
                                  color: 'primary.main',
                                }
                              : {}
                          }
                        >
                          <Icon icon={page.icon} />
                        </ListItemIcon>
                        <ListItemText primary={page.label} />
                      </ListItemButton>
                    </Link>
                  </Tooltip>
                ))}
              </List>
            </div>
          )}
        </AppContext.Consumer>
      )}
    </ColorContext.Consumer>
  )
}

export default AppBar
