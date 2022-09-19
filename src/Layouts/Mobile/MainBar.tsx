import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { AppContext } from '../../App'
import Icon from '../../Components/Icon'
import styles from './mainbar.module.scss'
import { Link } from 'react-router-dom'

const MainBar: React.FC<{ onOpenDrawer: () => void }> = ({ onOpenDrawer }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <AppContext.Consumer>
      {({ appBar }) => (
        <Box className={styles.mainbar}>
          <AppBar
            position="static"
            style={{ backgroundColor: 'transparent', backgroundImage: 'none' }}
            enableColorOnDark
            elevation={0}
          >
            <Toolbar
              style={{
                backgroundColor: 'transparent',
                backgroundImage: 'none',
              }}
            >
              {appBar?.up ? (
                <Link to={appBar.up}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="Back"
                  >
                    <Icon icon="chevron-left" />
                  </IconButton>
                </Link>
              ) : (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onOpenDrawer}
                >
                  <Icon icon="menu" />
                </IconButton>
              )}
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={{ flex: 1 }}
              >
                {appBar?.label ?? 'FrontBase'}
              </Typography>
              {appBar?.actions &&
                appBar.actions.map((action) => (
                  <Box
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                    key={action.key}
                  >
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={action.onClick}
                      title={action.label}
                    >
                      <Icon icon={action.icon} />
                    </IconButton>
                  </Box>
                ))}
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </AppContext.Consumer>
  )
}

export default MainBar
