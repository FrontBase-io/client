import { useEffect, useState } from 'react'
import Loading from '../../../../../Components/Loading'
import { ModelType } from '../../../../../Types/Models'
import { UIType } from '../../../../../Types/System'
import appService from '../../../../../Utils/AppService'
import ModelDetail from './Detail'

const SettingsModels: React.FC<{ UI: UIType }> = ({ UI }) => {
  // Vars
  const [models, setModels] = useState<ModelType[]>()

  // Lifecycle
  useEffect(() => {
    const unregister = appService.registerPage({ title: 'Models' })
    appService.getAllModels((response) => {
      setModels(response.data)
    })
    return () => unregister()
  }, [])

  // UI
  if (!models) return <Loading />
  return (
    <UI.Layouts.ListDetailLayout
      list={models}
      component={ModelDetail}
      primary="name"
    />
  )
}

export default SettingsModels
