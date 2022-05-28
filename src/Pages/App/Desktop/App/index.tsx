import styles from './styles.module.scss'
import { motion } from 'framer-motion'

import { AppType, PageType } from '../../../../Types/Apps'
import { colour } from '../../../../Utils/Helpers/colours'

import { Link, Route, Routes } from 'react-router-dom'

import List from '../../../../Components/List/List'
import ListItem from '../../../../Components/List/ListItem'
import UI from '../../../../Components/UI'
import { UIType } from '../../../../Types/System'

const DesktopApp: React.FC<{ pages: PageType[]; app: AppType }> = ({
  pages,
  app,
}) => {
  // Vars

  // Lifecycle

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
            <Link key={page.key} to={`/${app.key}/${page.key}`}>
              <ListItem animated icon={page.icon}>
                {page.label}
              </ListItem>
            </Link>
          ))}
        </List>
      </motion.nav>
      <div className={styles.app}>
        <Routes>
          {pages.map((page) => {
            const Component = page.component
            const DetailComponent = page.detailComponent
            return (
              <>
                <Route
                  path={page.key}
                  key={page.key}
                  element={<Component {...page.pageProps} UI={UI as UIType} />}
                />
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
              </>
            )
          })}
        </Routes>
      </div>
    </div>
  )
}

export default DesktopApp
