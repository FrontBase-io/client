import { UIType } from '../../../../../Types/System'
import { useEffect } from 'react'
import appService from '../../../../../Utils/AppService'
import { ModelType } from '../../../../../Types/Models'

const AppViewModel: React.FC<{ UI: UIType; model: ModelType }> = ({
  UI,
  model,
}) => {
  // Vars

  // Lifecycle
  useEffect(() => {
    const unregister = appService.registerPage({ title: model.name_plural })
    return () => unregister()
  }, [model])
  // UI
  return <UI.Model.Overview model={model} baseUrl="/explorer" />
}

export default AppViewModel
