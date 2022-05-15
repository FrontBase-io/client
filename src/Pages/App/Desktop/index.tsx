import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import appService from '../../../Utils/AppService'
import { AppType } from '../../../Types/Apps'
import { ResponseType } from '../../../Types/Server'
import AppIcon from '../../../Components/AppIcon'
import { Link } from 'react-router-dom'
import Routes from '../../../Routes'
import { useGlobal } from 'reactn'

const DesktopLayout: React.FC = () => {
  // Vars
  const [apps, setApps] = useState<AppType[]>([])
  //@ts-ignore
  const [currentApp] = useGlobal('currentApp')

  // Lifecycle
  useEffect(() => {
    appService.getObjects('App', (response: ResponseType) => {
      if (response.success) {
        setApps(response.data as AppType[])
      } else {
        console.error(response.reason)
      }
    })
  }, [])

  // UI
  return (
    <div className={styles.desktop}>
      <div className={styles.appbar}>
        <Link to="/">
          <img src="/logo.png" className={styles.logo} />
        </Link>
        {apps.map((app) => (
          <AppIcon app={app} key={app._id} active={app.key === currentApp} />
        ))}
      </div>
      <div className={styles.appcontainer}>
        <Routes apps={apps} size="desktop" />
      </div>
    </div>
  )
}

export default DesktopLayout
