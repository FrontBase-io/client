import {
  Fab,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useEffect } from 'react'
import Icon from '../../../../../../Components/Icon'
import useEditable from '../../../../../../Helpers/useEditableModel'
import { ModelOverviewType, ModelType } from '../../../../../../Types/Model'
import { useData } from '../../../../../../Utils/Data'
import { PageProps } from '../../../../../Types'

const ModelsOverviewsDetail: React.FC<PageProps> = ({
  UI: { Card },
  item,
  itemKey,
  model,
}) => {
  // Vars
  const { editable, set, changed, update } =
    useEditable<ModelOverviewType>(item)
  const { updateModel } = useData()

  // Lifecycle
  useEffect(() => {
    update(item)
  }, [item])

  // Functions

  // UI
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Card title="Available" animate withoutPadding>
            <List disablePadding>
              {Object.keys((model as ModelType).fields)
                .filter((f) => !editable.fields.includes(f))
                .map((fieldKey) => (
                  <ListItemButton
                    key={fieldKey}
                    onClick={() => {
                      set('fields', [...editable.fields, fieldKey])
                    }}
                  >
                    <ListItemText
                      primary={(model as ModelType).fields[fieldKey].name}
                      secondary={fieldKey}
                    />
                  </ListItemButton>
                ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card title="Selected" animate withoutPadding>
            <List disablePadding>
              {Object.keys((model as ModelType).fields)
                .filter((f) => editable.fields.includes(f))
                .map((fieldKey) => (
                  <ListItemButton
                    key={fieldKey}
                    onClick={() => {
                      set(
                        'fields',
                        editable.fields.filter((f) => f !== fieldKey)
                      )
                    }}
                  >
                    <ListItemText
                      primary={(model as ModelType).fields[fieldKey].name}
                      secondary={fieldKey}
                    />
                  </ListItemButton>
                ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card animate>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  {editable.fields.map((f) => (
                    <th key={f}>{(model as ModelType).fields[f].name}</th>
                  ))}
                </tr>
              </thead>
            </table>
          </Card>
        </Grid>
      </Grid>{' '}
      {changed && (
        <Fab
          onClick={() => {
            const newOverviews = model.overviews
            newOverviews[itemKey] = editable
            updateModel(model.key, { overviews: newOverviews })
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

export default ModelsOverviewsDetail
