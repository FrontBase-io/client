import { DialogContext } from '../../../../../../App'
import { ModelLayoutType, ModelType } from '../../../../../../Types/Model'
import { PageProps } from '../../../../../Types'
import ModelLayoutDetail from './Detail'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../../../../../Utils/Data'

const ModelLayouts: React.FC<PageProps> = ({
  UI: { ListDetailLayout },
  model,
}) => {
  // Vars
  const navigate = useNavigate()
  const { updateModel } = useData()

  // Lifecycle

  // Functions

  // UI
  return (
    <DialogContext.Consumer>
      {({ setDialog }) => (
        <ListDetailLayout
          title="Layouts"
          baseUrl={`/settings/models/${model?.key_plural}/layouts`}
          component={ModelLayoutDetail}
          componentProps={{ model }}
          list={Object.keys((model as ModelType).layouts ?? {}).map(
            (fieldKey) => ({
              label: model.layouts[fieldKey].label,
              key: fieldKey,
              item: model.layouts[fieldKey],
              icon: 'layers',
            })
          )}
          add={{
            label: 'Create',
            icon: 'layers-plus',
            onAdd: () => {
              setDialog({
                show: true,
                title: 'New layout',
                text: `Add a new layout`,
                form: [
                  { label: 'Name', key: 'name' },
                  { label: 'Key', key: 'key' },
                ],
                actions: [
                  {
                    label: 'Add',
                    onClick: (form) => {
                      // Add a neutral field
                      const newLayouts = model.layouts ?? {}
                      const newLayout: ModelLayoutType = {
                        label: form.name,
                        layout: [],
                      }
                      newLayouts[form.key] = newLayout
                      updateModel(model.key, { layouts: newLayouts })
                      navigate(
                        `/settings/models/${model.key_plural}/layouts/${form.key}`
                      )
                    },
                  },
                ],
              })
            },
          }}
        />
      )}
    </DialogContext.Consumer>
  )
}

export default ModelLayouts
