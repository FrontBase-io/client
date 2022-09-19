import { Grid, Typography } from '@mui/material'
import Field from '../Field'
import { LayoutItemType } from '../LayoutItem'
import EditField from '../EditField'

const LIFields: React.FC<LayoutItemType> = ({
  layoutItem,
  model,
  object,
  viewMode,
  setViewMode,
  setEditable,
}) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return layoutItem.settings?.auto ? (
    <div className="margin-y">
      <Grid container spacing={3}>
        {Object.keys(model.fields).map((fieldKey) => (
          <Grid item xs={6} key={fieldKey}>
            {viewMode === '___view' ? (
              <div onDoubleClick={() => setViewMode(fieldKey)}>
                <Field object={object} model={model} fieldKey={fieldKey} />
              </div>
            ) : (
              <EditField
                object={object}
                model={model}
                fieldKey={fieldKey}
                active={viewMode === fieldKey}
                setEditable={setEditable}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <>test</>
  )
}

export default LIFields
