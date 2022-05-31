import { ModelType } from '../../../../../Types/Models'
import { UIType } from '../../../../../Types/System'
import { useEffect } from 'react'
import appService from '../../../../../Utils/AppService'
import Model from './Model/Model'
import Fields from './Fields'
import Overviews from './Overviews'
import Layouts from './Layouts/index'

const ModelDetail: React.FC<{ UI: UIType; item: ModelType }> = ({
  UI,
  item,
}) => {
  // Vars
  useEffect(() => {
    if (item) {
      const unregister = appService.registerPage({
        title: item.name_plural,
        up: `/settings/models`,
      })
      return () => unregister()
    }
  }, [item])
  // Lifecycle

  // UI
  return (
    <UI.Tabs
      tabs={[
        { label: 'Model', component: Model },
        { label: 'Fields', component: Fields },
        { label: 'Overviews', component: Overviews },
        { label: 'Lay-outs', component: Layouts },
      ]}
    />
  )
}

export default ModelDetail
