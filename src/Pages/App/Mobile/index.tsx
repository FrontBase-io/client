import { Ripple } from 'primereact/ripple'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../../Components/Icon'
import styles from './index.module.scss'
import { Sidebar } from 'primereact/sidebar'
import List from '../../../Components/List/List'
import { AppType } from '../../../Types/Apps'
import appService from '../../../Utils/AppService'
import { useGlobal } from 'reactn'
import ListItem from '../../../Components/List/ListItem'
import MobileMenu from './Menu'
import Routes from '../../../Routes'

const MobileLayout: React.FC = () => {
  // Vars
  const [apps, setApps] = useState<AppType[]>([])
  //@ts-ignore
  const [currentApp] = useGlobal('currentApp')
  //@ts-ignore
  const [pageTitle] = useGlobal('pageTitle')

  // Lifecycle
  useEffect(() => {
    appService.getObjects('app', {}, (response) => {
      if (response.success) {
        setApps(response.data as AppType[])
      } else {
        console.error(response.reason)
      }
    })
  }, [])

  // UI
  return (
    <div className={styles.root}>
      <div className={styles.background} />
      <div className={styles.pageContent}>
        <div className={styles.navBar}>
          <MobileMenu apps={apps} />

          <Link to="/" className={`${styles.title} p-ripple`}>
            <h1>FrontBase</h1>
            <Ripple />
          </Link>
          <div className={styles.icons}>
            <Icon icon="magnify" withRipple />
          </div>
        </div>
        <div className={styles.content}>
          <Routes apps={apps} size="mobile" />
        </div>
      </div>
    </div>
  )
}

export default MobileLayout
