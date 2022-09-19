import { ModelType } from '../../../Types/Model'
import { ObjectType } from '../../../Types/Object'
import TextInput from '../../Inputs/Text'

const EditField: React.FC<{
  model: ModelType
  fieldKey: string
  object: ObjectType
  active: boolean
  setEditable: (field: string, value: any) => void
}> = ({ model, fieldKey, object, active, setEditable }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <>
      {model.fields[fieldKey].type === 'text' ? (
        <TextInput
          label={model.fields[fieldKey].name}
          value={object[fieldKey]}
          onChange={(newValue) => setEditable(fieldKey, newValue)}
          active={active}
        />
      ) : (
        `Unknown type ${model.fields[fieldKey].type}`
      )}
    </>
  )
}

export default EditField
