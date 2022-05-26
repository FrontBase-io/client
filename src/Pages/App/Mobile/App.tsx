import { AppType, PageType } from '../../../Types/Apps'
import styles from './App.module.scss'
import { TabView, TabPanel } from 'primereact/tabview'
import { Route, Routes } from 'react-router-dom'
import UI from '../../../Components/UI'
import { UIType } from '../../../Types/System'

const MobileApp: React.FC<{ pages: PageType[]; app: AppType }> = ({
  pages,
  app,
}) => {
  // Vars

  // Lifecycle

  // UI
  return (
    <>
      <TabView className={`tabview-header-icon ${styles.bottomBar}`}>
        {pages.map((page) => {
          const Component = page.component
          return (
            <TabPanel leftIcon={`mdi mdi-${page.icon}`} key={page.key}>
              <div className={styles.appContent}>
                <Component {...page.pageProps} UI={UI as UIType} />
              </div>
            </TabPanel>
          )
        })}
      </TabView>
    </>
  )
}

export default MobileApp
