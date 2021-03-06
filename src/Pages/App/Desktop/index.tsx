import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import appService from '../../../Utils/AppService'
import { AppType } from '../../../Types/Apps'
import AppIcon from '../../../Components/AppIcon'
import { Link } from 'react-router-dom'
import Routes from '../../../Routes'
import { useGlobal } from 'reactn'
import Animate from '../../../Components/Animation'
import { Ripple } from 'primereact/ripple'
import Icon from '../../../Components/Icon'

const DesktopLayout: React.FC = () => {
  // Vars
  const [apps, setApps] = useState<AppType[]>([])
  //@ts-ignore
  const [currentApp] = useGlobal('currentApp')
  //@ts-ignore
  const [pageTitle] = useGlobal('pageTitle')
  //@ts-ignore
  const [pageUp] = useGlobal('pageUp')

  // Lifecycle
  useEffect(() => {
    appService.getObjects('app', {}, (_apps) => {
      setApps(_apps as AppType[])
    })
  }, [])

  // UI
  return (
    <div className={styles.desktop}>
      <div className={styles.appbar}>
        <Link to="/" className="p-ripple">
          <img src="/logo.png" className={styles.logo} alt="Frontbase" />
          <Ripple />
        </Link>
        {apps.map((app) => (
          <AppIcon app={app} key={app._id} active={app.key === currentApp} />
        ))}
      </div>
      <div className={styles.appcontainer}>
        <div className={styles.desktopBackground} />
        <div className={styles.headerBar}>
          {pageTitle && (
            <Animate direction="right">
              <h1>
                {pageUp && (
                  <Link to={pageUp}>
                    <Icon icon="chevron-left" />
                  </Link>
                )}
                {pageTitle}
              </h1>
            </Animate>
          )}
        </div>
        <Routes apps={apps} size="desktop" />
      </div>
    </div>
  )
}

export default DesktopLayout
