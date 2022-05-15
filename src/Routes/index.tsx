import { Routes, Route } from 'react-router-dom'

import { AppType } from '../Types/Apps'
import { useEffect } from 'react'
import { useGlobal } from 'reactn'
import App from '../Apps/App'
import Page from '../Pages/App/Desktop/App/Page'

const AppRoutes: React.FC<{ apps: AppType[]; size: 'desktop' | 'mobile' }> = ({
  apps,
  size,
}) => {
  // Vars

  // Lifecycle

  // UI
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":appId/*" element={<App apps={apps} size={size} />} />
    </Routes>
  )
}

export default AppRoutes

const Home: React.FC = () => {
  //@ts-ignore
  const [, setCurrentApp] = useGlobal('currentApp')

  useEffect(() => {
    //@ts-ignore
    setCurrentApp(undefined)
  }, [])
  return <>Home</>
}
