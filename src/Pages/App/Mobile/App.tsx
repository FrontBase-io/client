import { AppType, PageType } from '../../../Types/Apps'
import styles from './App.module.scss'
import { TabView, TabPanel } from 'primereact/tabview'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UI from '../../../Components/UI'

const reducePages = (pages: PageType[]) => {
  const result: PageType[] = []
  pages.map((page) => {
    if (page.component) result.push(page)
    if (page.items) {
      result.push(...reducePages(page.items))
    }
  })
  return result
}

const MobileApp: React.FC<{ pages: PageType[]; app: AppType }> = ({
  pages,
  app,
}) => {
  // Vars
  const navigate = useNavigate()
  const params = useParams()
  const [flatPages, setFlatPages] = useState<PageType[]>([])
  const [selectedTab, setSelectedTab] = useState<number>(
    flatPages.findIndex((page) => page.key === params['*'])
  )

  // Lifecycle
  useEffect(() => {
    if (params['*'] !== '') {
      setSelectedTab(
        flatPages.findIndex((page) => page.key === params['*']?.split('/')[0])
      )
    } else {
      // navigate(`/${app.key}/${flatPages[0].key}`)
    }
  }, [params['*']])
  useEffect(() => {
    setFlatPages(reducePages(pages))
  }, [pages])

  // UI

  return (
    <>
      <TabView
        className={`tabview-header-icon ${styles.bottomBar}`}
        activeIndex={selectedTab}
        onTabChange={({ index }) =>
          navigate(`/${app.key}/${flatPages[index].key}`)
        }
      >
        {(flatPages ?? []).map((page) => {
          const Component = page.component
          const DetailComponent = page.detailComponent
          if (Component)
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
                    {DetailComponent && (
                      <Route
                        path={`/${page.key}/:objectId`}
                        element={
                          <DetailComponent {...page.detailPageProps} UI={UI} />
                        }
                      />
                    )}
                    <Route
                      path={`/${page.key}/*`}
                      element={<Component {...page.pageProps} UI={UI} />}
                    />
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
