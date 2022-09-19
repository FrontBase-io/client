import { Typography } from '@mui/material'
import { ModelType } from '../../../Types/Model'
import { ObjectType } from '../../../Types/Object'

const Field: React.FC<{
  model: ModelType
  fieldKey: string
  object: ObjectType
}> = ({ model, object, fieldKey }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <>
      <Typography variant="caption">{model.fields[fieldKey].name}</Typography>
      <div> {object[fieldKey] ?? '??'}</div>
    </>
  )
}

export default Field
