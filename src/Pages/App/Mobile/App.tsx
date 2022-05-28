import { AppType, PageType } from '../../../Types/Apps'
import styles from './App.module.scss'
import { TabView, TabPanel } from 'primereact/tabview'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UI from '../../../Components/UI'
import { UIType } from '../../../Types/System'

const MobileApp: React.FC<{ pages: PageType[]; app: AppType }> = ({
  pages,
  app,
}) => {
  // Vars
  const navigate = useNavigate()
  const params = useParams()
  const [selectedTab, setSelectedTab] = useState<number>(
    pages.findIndex((page) => page.key === params['*'])
  )

  // Lifecycle
  useEffect(() => {
    if (params['*'] !== '') {
      setSelectedTab(
        pages.findIndex((page) => page.key === params['*']?.split('/')[0])
      )
    } else {
      // navigate(`/${app.key}/${pages[0].key}`)
    }
  }, [params['*']])
  // UI
  return (
    <>
      <TabView
        className={`tabview-header-icon ${styles.bottomBar}`}
        activeIndex={selectedTab}
        onTabChange={({ index }) => navigate(`/${app.key}/${pages[index].key}`)}
      >
        {pages.map((page) => {
          const Component = page.component
          const DetailComponent = page.detailComponent
          return (
            <TabPanel
              leftIcon={`mdi mdi-${page.icon}`}
              header={page.label}
              key={page.key}
              headerStyle={{
                '&.p-tabview-ink-bar': { borderBottom: '10px solid black' },
              }}
            >
              <div className={styles.appContent}>
                <Routes>
                  <Route
                    path={`/${page.key}`}
                    element={
                      <Component {...page.pageProps} UI={UI as UIType} />
                    }
                  />
                  {DetailComponent && (
                    <Route
                      path={`/${page.key}/:objectId`}
                      element={
                        <DetailComponent
                          {...page.detailPageProps}
                          UI={UI as UIType}
                        />
                      }
                    />
                  )}
                </Routes>
              </div>
            </TabPanel>
          )
        })}
      </TabView>
    </>
  )
}

export default MobileApp
