import { useEffect, useState } from 'react'
import { useData } from '../../../../Utils/Data'
import { PageProps } from '../../../Types'
import { ListItemType } from '../../../../Types/UI'
import ModelsModel from './Model'

const Models: React.FC<PageProps> = ({ UI: { ListDetailLayout } }) => {
  // Vars
  const [modelList, setModelList] = useState<ListItemType[]>()
  const { getModels } = useData()

  // Lifecycle
  useEffect(() => {
    getModels({ filter: {} }, (models) => {
      setModelList(
        models.map((m) => ({
          label: m.label_plural,
          key: m.key_plural,
          icon: m.icon,
          item: m,
        }))
      )
    })
  }, [])

  // Functions

  // UI
  return (
    <ListDetailLayout
      title="Models"
      list={modelList}
      baseUrl="/settings/models"
      component={ModelsModel}
    />
  )
}

export default Models
