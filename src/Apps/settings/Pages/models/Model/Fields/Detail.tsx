import { Button, Fab, Grid } from '@mui/material'
import { useEffect } from 'react'
import Icon from '../../../../../../Components/Icon'
import { ModelFieldType } from '../../../../../../Types/Model'
import { useData } from '../../../../../../Utils/Data'
import { PageProps } from '../../../../../Types'

const ModelsModelFieldDetail: React.FC<PageProps> = ({
  UI: {
    Card,
    Inputs: { TextInput, SelectInput },
  },
  helpers: { useEditable },
  item,
  itemKey,
  model,
}) => {
  // Vars
  const { editable, set, changed, update } = useEditable<ModelFieldType>(item)
  const { updateModel } = useData()

  // Lifecycle
  useEffect(() => {
    update(item)
  }, [item])
  // Functions

  // UI
  return (
    <>
      <Card title={editable.name} animate>
        <div className="margin-y">
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TextInput
                label="Test"
                value={editable.name}
                onChange={(v) => set('name', v)}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectInput
                label="Type"
                value={editable.type}
                onChange={(v) => set('type', v)}
                options={[
                  { label: 'Text', key: 'text' },
                  { label: 'Number', key: 'number' },
                  { label: 'List', key: 'list' },
                  { label: 'Formula', key: 'formula' },
                ]}
              />
            </Grid>
          </Grid>
        </div>
      </Card>
      <Card title="Options" animate>
        {editable.type}
      </Card>
      {changed && (
        <Fab
          onClick={() => {
            const newFields = model.fields
            newFields[itemKey] = editable
            updateModel(model.key, { fields: newFields })
            update(editable)
          }}
          color="primary"
          style={{ position: 'fixed', right: 15, bottom: 15 }}
          title="Save changes"
        >
          <Icon icon="content-save" />
        </Fab>
      )}
    </>
  )
}

export default ModelsModelFieldDetail
