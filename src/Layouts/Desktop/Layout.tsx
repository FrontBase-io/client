import styles from './styles.module.scss'
import { useData } from '../../Utils/Data'

import { useEffect, useState } from 'react'
import { AppType } from '../../Types/App'
import { Route, Routes } from 'react-router-dom'

import MainBar from './MainBar'
import Desktop from '../../Pages/Desktop'
import AppDetail from './AppDetail'

const DesktopLayout: React.FC = () => {
  // Vars
  const [apps, setApps] = useState<AppType[]>()

  // Hooks
  const { getObjects } = useData()

  // Lifecycle
  useEffect(() => {
    getObjects({ model: 'app' }, (apps) => setApps(apps as AppType[]))
  }, [])

  // Functions

  // UI
  return (
    <div className={styles.desktop}>
      <MainBar apps={apps} />
      <Routes>
        <Route path=":appId/*" element={<AppDetail apps={apps} />} />
        <Route path="/" element={<Desktop />} />
      </Routes>
    </div>
  )
}

export default DesktopLayout
