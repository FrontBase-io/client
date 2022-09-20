import { useEffect, useState } from 'react'
import { useData } from '../../../../Utils/Data'
import { PageProps } from '../../../Types'
import { ListItemType } from '../../../../Types/UI'
import ModelsModel from './Model'
import { DialogContext } from '../../../../App'

const Models: React.FC<PageProps> = ({ UI: { ListDetailLayout } }) => {
  // Vars
  const [modelList, setModelList] = useState<ListItemType[]>()
  const { getModels, addModel } = useData()

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
    <DialogContext.Consumer>
      {({ setDialog }) => (
        <ListDetailLayout
          title="Models"
          list={modelList}
          baseUrl="/settings/models"
          component={ModelsModel}
          add={{
            label: 'Create',
            subtitle: 'New model',
            icon: 'view-grid-plus',
            onAdd: () =>
              setDialog({
                show: true,
                title: 'New model',
                form: [
                  { label: 'Label', key: 'label' },
                  { label: 'Label (plural)', key: 'label_plural' },
                  { label: 'Key', key: 'key' },
                  { label: 'Key (plural)', key: 'key_plural' },
                  { label: 'Icon', key: 'icon' },
                ],
                actions: [
                  {
                    label: 'Add',
                    onClick: (form) =>
                      addModel(
                        form as {
                          label: string
                          label_plural: string
                          key: string
                          key_plural: string
                          icon: string
                        }
                      ),
                  },
                ],
              }),
          }}
        />
      )}
    </DialogContext.Consumer>
  )
}

export default Models
