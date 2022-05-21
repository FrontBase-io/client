import { UIType } from '../../../../Types/System'
import { useEffect } from 'react'
import appService from '../../../../Utils/AppService'

const AppViewModel: React.FC<{ UI: UIType }> = ({ UI }) => {
  // Vars

  // Lifecycle
  useEffect(() => {
    const unregister = appService.registerPage({ title: 'Users' })
    return () => unregister()
  }, [])
  // UI
  return (
    <UI.Card animate title="TEst">
      AppViewModel
    </UI.Card>
  )
}

export default AppViewModel
