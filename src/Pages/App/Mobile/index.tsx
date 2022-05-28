import { Ripple } from 'primereact/ripple'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../../Components/Icon'
import styles from './index.module.scss'
import { AppType } from '../../../Types/Apps'
import appService from '../../../Utils/AppService'
import { useGlobal } from 'reactn'
import MobileMenu from './Menu'
import Routes from '../../../Routes'
import Animate from '../../../Components/Animation'

const MobileLayout: React.FC = () => {
  // Vars
  const [apps, setApps] = useState<AppType[]>([])

  //@ts-ignore
  const [pageTitle] = useGlobal('pageTitle')
  //@ts-ignore
  const [pageUp] = useGlobal('pageUp')

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
            {pageTitle && (
              <Animate direction="right">
                <h1>
                  {pageUp && (
                    <Link to={pageUp}>
                      <Animate direction="up">
                        <Icon icon="chevron-left" />
                      </Animate>
                    </Link>
                  )}
                  {pageTitle}
                </h1>
              </Animate>
            )}
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
