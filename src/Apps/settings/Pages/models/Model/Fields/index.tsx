import { useNavigate } from 'react-router-dom'
import { DialogContext } from '../../../../../../App'
import { ModelFieldType, ModelType } from '../../../../../../Types/Model'
import { useData } from '../../../../../../Utils/Data'
import { PageProps } from '../../../../../Types'
import ModelsModelFieldDetail from './Detail'

const ModelsModelFields: React.FC<PageProps> = ({
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
          title="Fields"
          baseUrl={`/settings/models/${model?.key_plural}/fields`}
          component={ModelsModelFieldDetail}
          componentProps={{ model }}
          list={Object.keys((model as ModelType).fields ?? {}).map(
            (fieldKey) => ({
              label: model.fields[fieldKey].name,
              hint: model.fields[fieldKey].type,
              key: fieldKey,
              item: model.fields[fieldKey],
              icon:
                model.fields[fieldKey].type === 'text'
                  ? 'cursor-text'
                  : model.fields[fieldKey].type === 'number'
                  ? 'numeric'
                  : model.fields[fieldKey].type === 'list'
                  ? 'format-list-bulleted-square'
                  : model.fields[fieldKey].type === 'formula'
                  ? 'pot-mix'
                  : model.fields[fieldKey].type === 'relationship'
                  ? 'human-greeting-proximity'
                  : 'help-circle-outline',
            })
          )}
          add={{
            label: 'New field',
            icon: 'playlist-plus',
            onAdd: () => {
              setDialog({
                show: true,
                title: 'Add new field',
                text: `Add a new field to the ${model.label_plural} model.`,
                form: [
                  { label: 'Name', key: 'name' },
                  { label: 'Key', key: 'key' },
                ],
                actions: [
                  {
                    label: 'Add',
                    onClick: (form) => {
                      // Add a neutral field
                      const newFields = model.fields ?? {}
                      const newField: ModelFieldType = {
                        name: form.name,
                        type: 'text',
                      }
                      newFields[form.key] = newField
                      updateModel(model.key, { fields: newFields })
                      navigate(
                        `/settings/models/${model.key_plural}/fields/${form.key}`
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

export default ModelsModelFields
