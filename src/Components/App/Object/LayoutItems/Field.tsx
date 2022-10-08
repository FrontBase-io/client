import { Typography } from '@mui/material'
import ViewDate from 'Components/App/Fields/View/Date'
import ViewRelationship from 'Components/App/Fields/View/Relationship'
import { ModelType } from 'Types/Model'
import { ObjectType } from 'Types/Object'

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
      {model.fields[fieldKey].type === 'relationship' ? (
        <>
          <Typography variant="caption">
            {model.fields[fieldKey].name}
          </Typography>
          {object[fieldKey] ? (
            <ViewRelationship
              modelKey={model.fields[fieldKey].settings?.to}
              to={object[fieldKey]}
            />
          ) : (
            '-'
          )}
        </>
      ) : model.fields[fieldKey].type === 'date' ? (
        <>
          <Typography variant="caption">
            {model.fields[fieldKey].name}
          </Typography>
          <div>
            <ViewDate date={object[fieldKey]} />
          </div>
        </>
      ) : (
        <>
          <Typography variant="caption">
            {model.fields[fieldKey].name}
          </Typography>
          <div> {object[fieldKey] ?? '-'}</div>
        </>
      )}
    </>
  )
}

export default Field
