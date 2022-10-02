import { Fab, Grid } from '@mui/material'
import { useEffect } from 'react'
import { ModelType } from '../../../../../../Types/Model'
import { PageProps } from '../../../../../Types'

const ModelsModelModel: React.FC<PageProps> = ({
  UI: {
    Card,
    Icon,
    Inputs: { TextInput },
  },
  helpers: { useEditable },
  model,
}) => {
  // Vars
  const { editable, set, changed, updateModel, update } =
    useEditable<ModelType>(model)

  // Lifecycle
  useEffect(() => {
    update(model)
  }, [model])

  // Functions

  // UI
  return (
    <>
      {changed && (
        <Fab
          onClick={updateModel}
          color="primary"
          style={{ position: 'fixed', right: 15, bottom: 15 }}
          title="Save changes"
        >
          <Icon icon="content-save" />
        </Fab>
      )}
      <Card animate title={editable.label_plural}>
        <div className="margin-y">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextInput
                label="Label"
                value={editable.label}
                onChange={(v) => set('label', v)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="Label (Plural)"
                value={editable.label_plural}
                onChange={(v) => set('label_plural', v)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="Key"
                value={editable.key}
                onChange={(v) => set('key', v)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="Key (Plural)"
                value={editable.key_plural}
                onChange={(v) => set('key_plural', v)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="Icon"
                value={editable.icon}
                onChange={(v) => set('icon', v)}
              />
            </Grid>
            <Grid item xs={6}>
              <Icon icon={editable.icon} />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="Primary"
                value={editable.primary}
                onChange={(v) => set('primary', v)}
              />
            </Grid>
          </Grid>
        </div>
      </Card>
    </>
  )
}

export default ModelsModelModel
