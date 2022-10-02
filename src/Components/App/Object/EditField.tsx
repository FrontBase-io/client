import { ModelType } from 'Types/Model'
import { NewObjectType, ObjectType } from 'Types/Object'
import TextInput from '../../Inputs/Text'
import EditRelationship from '../Fields/Edit/Relationship'

const EditField: React.FC<{
  model: ModelType
  fieldKey: string
  object: ObjectType | NewObjectType
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
          value={object[fieldKey] ?? ''}
          onChange={(newValue) => setEditable(fieldKey, newValue)}
          active={active}
        />
      ) : model.fields[fieldKey].type === 'relationship' ? (
        <EditRelationship
          label={model.fields[fieldKey].name}
          from={object._id}
          to={model.fields[fieldKey].settings?.to}
          value={object[fieldKey] ?? ''}
          onChange={(newValue) => setEditable(fieldKey, newValue)}
        />
      ) : (
        `Unknown type ${model.fields[fieldKey].type}`
      )}
    </>
  )
}

export default EditField
