import { Grid } from '@mui/material'
import { ModelLayoutItemType, ModelType } from '../../../../Types/Model'

const LIFields: React.FC<{
  layoutItem: ModelLayoutItemType
  children?: JSX.Element | JSX.Element[]
  model: ModelType
}> = ({ layoutItem, model }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return layoutItem.settings?.auto ? (
    <Grid container>
      {Object.keys(model.fields).map((fieldKey) => (
        <Grid item xs={6}>
          {fieldKey}
        </Grid>
      ))}
    </Grid>
  ) : (
    <>test</>
  )
}

export default LIFields
