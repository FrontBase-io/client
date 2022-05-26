import { Ripple } from 'primereact/ripple'
import { Sidebar } from 'primereact/sidebar'
import { useState } from 'react'
import List from '../../../Components/List/List'
import ListItem from '../../../Components/List/ListItem'
import { AppType } from '../../../Types/Apps'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'

const MobileMenu: React.FC<{ apps: AppType[] }> = ({ apps }) => {
  // Vars
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const navigate = useNavigate()
  // Lifecycle

  // UI
  return (
    <>
      <div onClick={() => setShowSidebar(!showSidebar)} className="p-ripple">
        <img src="/logo.png" className={styles.logo} alt="Frontbase" />
        <Ripple />
      </div>
      <Sidebar visible={showSidebar} onHide={() => setShowSidebar(false)}>
        <List animated>
          {apps.map((app) => (
            <ListItem
              animated
              key={app._id}
              onClick={() => {
                navigate(`/${app.key}`)
                setShowSidebar(false)
              }}
            >
              {app.name}
            </ListItem>
          ))}
        </List>
      </Sidebar>
    </>
  )
}

export default MobileMenu
