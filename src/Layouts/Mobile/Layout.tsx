import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { ColorContext } from '../../App'
import Icon from '../../Components/Icon'
import LogoWide from '../../Components/Logo/LogoWide'
import Desktop from '../../Pages/Desktop'
import { AppType } from '../../Types/App'
import { useData } from '../../Utils/Data'
import AppDetail from './AppDetail'
import styles from './layout.module.scss'
import MainBar from './MainBar'

const MobileLayout: React.FC = () => {
  // Vars
  const [apps, setApps] = useState<AppType[]>()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Hooks
  const { getObjects } = useData()

  // Lifecycle
  useEffect(() => {
    getObjects({ model: 'app' }, (apps) => setApps(apps as AppType[]))
  }, [])

  // Functions

  // UI
  return (
    <ColorContext.Consumer>
      {({ primary }) => (
        <div className={styles['mobile-layout']}>
          <div
            className={styles.backdrop}
            style={{ backgroundColor: primary }}
          />
          <MainBar onOpenDrawer={() => setDrawerOpen(true)} />
          <div className={styles.content}>
            <Routes>
              <Route path=":appId/*" element={<AppDetail apps={apps} />} />
              <Route path="/" element={<Desktop />} />
            </Routes>
          </div>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <div className={styles.menu}>
              <div className={styles['menu-header']}>
                <Link to="/" onClick={() => setDrawerOpen(false)}>
                  <LogoWide />
                </Link>
              </div>
              <List disablePadding>
                {apps?.map((app) => (
                  <Link to={`/${app.key}`} key={app._id}>
                    <ListItemButton onClick={() => setDrawerOpen(false)}>
                      <ListItemIcon>
                        <Icon icon={app.icon} />
                      </ListItemIcon>
                      <ListItemText primary={app.name} />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </div>
          </Drawer>
        </div>
      )}
    </ColorContext.Consumer>
  )
}

export default MobileLayout
