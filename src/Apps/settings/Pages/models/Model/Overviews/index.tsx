import { DialogContext } from '../../../../../../App'
import { ModelOverviewType, ModelType } from '../../../../../../Types/Model'
import { useData } from '../../../../../../Utils/Data'
import { PageProps } from '../../../../../Types'
import ModelsOverviewsDetail from './Detail'
import { useNavigate } from 'react-router-dom'

const ModelsOverviews: React.FC<PageProps> = ({
  UI: { ListDetailLayout },
  model,
}) => {
  // Vars
  const { updateModel } = useData()
  const navigate = useNavigate()

  // Lifecycle

  // Functions

  // UI
  return (
    <DialogContext.Consumer>
      {({ setDialog }) => (
        <ListDetailLayout
          title="Overviews"
          baseUrl={`/settings/models/${model?.key_plural}/overviews`}
          component={ModelsOverviewsDetail}
          componentProps={{ model }}
          list={Object.keys((model as ModelType).overviews ?? {}).map(
            (fieldKey) => ({
              label: model.overviews[fieldKey].label,
              key: fieldKey,
              item: model.overviews[fieldKey],
              icon: 'table-row',
            })
          )}
          add={{
            label: 'Create',
            icon: 'table-row-plus-before',
            onAdd: () => {
              setDialog({
                show: true,
                title: 'New overview',
                text: `Add a new overview`,
                form: [
                  { label: 'Name', key: 'name' },
                  { label: 'Key', key: 'key' },
                ],
                actions: [
                  {
                    label: 'Add',
                    onClick: (form) => {
                      // Add a neutral field
                      const newOverviews = model.overviews ?? {}
                      const newOverview: ModelOverviewType = {
                        label: form.name,
                        fields: [],
                      }
                      newOverviews[form.key] = newOverview
                      updateModel(model.key, { overviews: newOverviews })
                      navigate(
                        `/settings/models/${model.key_plural}/overviews/${form.key}`
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

export default ModelsOverviews
