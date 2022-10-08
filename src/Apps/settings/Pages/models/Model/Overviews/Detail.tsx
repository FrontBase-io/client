import {
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from '../../../../../../Components/Icon'
import { SelectInputOptionType } from '../../../../../../Components/Inputs/Select'
import Menu from '../../../../../../Components/Menu'
import useEditable from '../../../../../../Helpers/useEditable'
import { ModelOverviewType, ModelType } from '../../../../../../Types/Model'
import { useData } from '../../../../../../Utils/Data'
import { PageProps } from '../../../../../Types'

const ModelsOverviewsDetail: React.FC<PageProps> = ({
  UI: {
    Card,
    Animation: { AnimateGroup, AnimateItem },
    Inputs: { SelectInput },
  },
  item,
  itemKey,
  model,
}) => {
  // Vars
  const { editable, set, changed, update } =
    useEditable<ModelOverviewType>(item)
  const { updateModel } = useData()

  // Actions

  // Lifecycle
  useEffect(() => {
    update(item)
  }, [item])

  // Functions

  // UI
  return (
    <>
      <AnimateGroup>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AnimateItem>
              <Card title="Actions">
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Global</Typography>
                    {(editable.actions?.global ?? []).map(
                      (action, actionIndex) => (
                        <IconButton
                          key={`action-global-${actionIndex}`}
                          title={action.type}
                        >
                          <Icon
                            icon={{ create: 'account-plus' }[action.type]}
                          />
                        </IconButton>
                      )
                    )}
                    <Menu
                      icon="plus"
                      label="Add"
                      items={[
                        {
                          label: 'Create',
                          key: 'create',
                          onClick: () => {
                            set('actions', {
                              ...(editable.actions || {}),
                              global: [
                                ...(editable.actions?.global ?? []),
                                { type: 'create' },
                              ],
                            })
                          },
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Single</Typography>
                    <Menu icon="plus" label="Add" items={[]} />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Multiple</Typography>
                    <Menu icon="plus" label="Add" items={[]} />
                  </Grid>
                </Grid>
              </Card>
            </AnimateItem>
          </Grid>
          <Grid item xs={6}>
            <AnimateItem>
              <Card title="Available" animate withoutPadding>
                <List disablePadding>
                  {Object.keys((model as ModelType).fields)
                    .filter((f) => !editable.fields.includes(f))
                    .map((fieldKey) =>
                      (model as ModelType)?.fields?.[fieldKey]?.name ? (
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
                      ) : (
                        <></>
                      )
                    )}
                </List>
              </Card>
            </AnimateItem>
          </Grid>
          <Grid item xs={6}>
            <AnimateItem>
              <Card title="Selected" animate withoutPadding>
                <List disablePadding>
                  {Object.keys((model as ModelType).fields)
                    .filter((f) => editable.fields.includes(f))
                    .map((fieldKey) =>
                      (model as ModelType)?.fields?.[fieldKey]?.name ? (
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
                      ) : (
                        <></>
                      )
                    )}
                </List>
              </Card>
            </AnimateItem>
          </Grid>
          <Grid item xs={12}>
            <AnimateItem>
              <Card animate>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      {editable.fields.map((f) =>
                        (model as ModelType)?.fields?.[f]?.name ? (
                          <th key={f}>{(model as ModelType).fields[f].name}</th>
                        ) : (
                          <></>
                        )
                      )}
                    </tr>
                  </thead>
                </table>
              </Card>
            </AnimateItem>
          </Grid>
        </Grid>
      </AnimateGroup>
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
