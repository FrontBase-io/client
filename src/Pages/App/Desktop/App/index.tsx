import styles from './styles.module.scss'
import { motion } from 'framer-motion'

import { AppType, PageType } from '../../../../Types/Apps'
import { colour } from '../../../../Utils/Helpers/colours'

import { Link, Route, Routes } from 'react-router-dom'

import List from '../../../../Components/List/List'
import ListItem from '../../../../Components/List/ListItem'
import UI from '../../../../Components/UI'
import { UIType } from '../../../../Types/System'
import ListHeader from '../../../../Components/List/ListHeader'
import { useEffect, useState } from 'react'

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

const DesktopApp: React.FC<{ pages: PageType[]; app: AppType }> = ({
  pages,
  app,
}) => {
  // Vars
  const [flatPages, setFlatPages] = useState<PageType[]>([])

  // Lifecycle
  useEffect(() => {
    setFlatPages(reducePages(pages))
  }, [pages])

  // UI
  return (
    <div className={styles.root}>
      <motion.nav
        initial={'closed'}
        animate={'open'}
        className={styles.pageMenu}
      >
        <motion.div
          variants={{
            open: (height = 1000) => ({
              opacity: 1,
              y: 0,
            }),
            closed: {
              opacity: 0,
              y: '-100%',
              transition: {
                delay: 0.3,
                type: 'spring',
                stiffness: 400,
                damping: 40,
              },
            },
          }}
        />
        <div
          className={styles.appTitle}
          style={{
            color: colour(app.colour),
            borderBottom: `1px solid ${colour(app.colour)}`,
          }}
        >
          <i className={`mdi mdi-${app.icon}`}></i>
          <h2>{app.name}</h2>
        </div>
        <List animated>
          {pages.map((page) => (
            <PageItem page={page} app={app} indent={0} key={page.key} />
          ))}
        </List>
      </motion.nav>
      <div className={styles.app}>
        <Routes>
          {flatPages.map((page) => {
            const Component = page.component!
            const DetailComponent = page.detailComponent
            return (
              <>
                {DetailComponent && (
                  <Route
                    path={`${page.key}/:objectId`}
                    key={`${page.key}-detail`}
                    element={
                      <DetailComponent
                        {...page.detailPageProps}
                        UI={UI as UIType}
                      />
                    }
                  />
                )}
                <Route
                  path={`${page.key}/*`}
                  key={page.key}
                  element={<Component {...page.pageProps} UI={UI as UIType} />}
                />
              </>
            )
          })}
        </Routes>
      </div>
    </div>
  )
}

export default DesktopApp

const PageItem: React.FC<{ page: PageType; app: AppType; indent: number }> = ({
  page,
  app,
  indent,
}) => {
  return page.header ? (
    <>
      <ListHeader animated>{page.label}</ListHeader>
      {(page.items ?? []).map((subItem) => (
        <PageItem page={subItem} app={app} indent={indent} key={subItem.key} />
      ))}
    </>
  ) : (
    <>
      <Link key={page.key} to={`/${app.key}/${page.key}`}>
        <ListItem animated icon={page.icon} style={{ marginLeft: 15 * indent }}>
          {page.label}
        </ListItem>
      </Link>
      {(page.items ?? []).map((subItem) => (
        <PageItem
          page={subItem}
          app={app}
          indent={indent + 1}
          key={subItem.key}
        />
      ))}
    </>
  )
}

const RouteItem: React.FC<{ page: PageType }> = ({ page }) => {
  const Component = page.component
  const DetailComponent = page.detailComponent

  return (
    <>
      {Component && (
        <Route
          path={page.key}
          key={page.key}
          element={<Component {...page.pageProps} UI={UI as UIType} />}
        />
      )}
      {DetailComponent && (
        <Route
          path={`${page.key}/:objectId`}
          key={`${page.key}-detail`}
          element={
            <DetailComponent {...page.detailPageProps} UI={UI as UIType} />
          }
        />
      )}
      {(page.items ?? []).map((subPage) => (
        <>
          <RouteItem page={subPage} key={subPage.key} />
        </>
      ))}
    </>
  )
}
