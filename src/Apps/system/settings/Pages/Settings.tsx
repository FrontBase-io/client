import { useEffect } from 'react'
import { UIType } from '../../../../Types/System'
import appService from '../../../../Utils/AppService'

const AppSettings: React.FC<{ UI: UIType }> = ({ UI }) => {
  // Vars

  // Lifecycle
  useEffect(() => {
    const unregister = appService.registerPage({ title: 'Settings' })
    return () => unregister()
  }, [])
  // UI
  return (
    <UI.Card title="Settings" animate>
      Settings
    </UI.Card>
  )
}

export default AppSettings
