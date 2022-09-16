import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { AppContext } from '../../App'
import Icon from '../../Components/Icon'
import styles from './mainbar.module.scss'

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
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={onOpenDrawer}
              >
                <Icon icon="menu" />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                {appBar?.label ?? 'FrontBase'}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </AppContext.Consumer>
  )
}

export default MainBar
