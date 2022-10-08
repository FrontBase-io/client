import {
  Fab,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'Components/Icon'
import { ModelFieldType, ModelType } from 'Types/Model'
import { useData } from 'Utils/Data'
import { PageProps } from '../../../../../Types'
import { DialogContext } from 'App'

const ModelsModelFieldDetail: React.FC<PageProps> = ({
  UI: {
    Card,
    Inputs: { TextInput, SelectInput },
    Animation: { AnimateGroup, AnimateItem },
  },
  helpers: { useEditable },
  item,
  itemKey,
  model,
}) => {
  // Vars
  const { editable, set, changed, update } = useEditable<ModelFieldType>(item)
  const { updateModel, getModels } = useData()
  const [models, setModels] = useState<ModelType[]>([])

  // Lifecycle
  useEffect(() => {
    update(item)
  }, [item])
  useEffect(() => {
    getModels({ filter: {} }, (_models) => {
      setModels(_models)
    })
  }, [])

  // Functions

  // UI
  return (
    <DialogContext.Consumer>
      {({ setDialog }) => (
        <>
          <AnimateGroup>
            <AnimateItem>
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
                          { label: 'Date', key: 'date' },
                          { label: 'List', key: 'list' },
                          { label: 'Formula', key: 'formula' },
                          { label: 'Relationship', key: 'relationship' },
                        ]}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Card>
            </AnimateItem>
            <AnimateItem>
              {editable.type === 'formula' ? (
                <Card title="Design formula" animate>
                  <Typography>
                    A formula represents a certain logic that uses data from
                    other places to calculate the value of the field.
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={8}>
                      <TextInput
                        label="Formula"
                        value={editable.settings?.formula ?? ''}
                        onChange={(v) => set('settings.formula', v)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <strong>Formula facts</strong>
                      <Typography>
                        This formula works <Icon icon="clock-fast" />{' '}
                        <em>instantly</em>.
                      </Typography>
                      <List>
                        <ListSubheader>Linked fields</ListSubheader>
                        <ListItem>
                          <ListItemText>First name</ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemText>Last name</ListItemText>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Card>
              ) : editable.type === 'relationship' ? (
                <Card title="Relationship settings" animate>
                  <SelectInput
                    label="Relationship to"
                    value={editable.settings?.to}
                    onChange={(v) => set('settings.to', v)}
                    options={models?.map((m) => ({
                      label: m.label,
                      key: m.key,
                    }))}
                  />
                </Card>
              ) : editable.type === 'list' ? (
                <AnimateGroup>
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <AnimateItem>
                        <Card title="Options" withoutPadding>
                          <List disablePadding>
                            {(editable.settings?.options ?? []).map(
                              (option: { label: string; key: string }) => (
                                <ListItemButton key={option.key}>
                                  <ListItemIcon>
                                    <Icon icon="plus" />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={option.label}
                                    secondary={option.key}
                                  />
                                </ListItemButton>
                              )
                            )}
                            <ListItemButton>
                              <ListItemIcon>
                                <Icon icon="plus" />
                              </ListItemIcon>
                              <ListItemText
                                primary="Add option"
                                onClick={() =>
                                  setDialog({
                                    show: true,
                                    title: 'Add option',
                                    form: [
                                      { label: 'Label', key: 'label' },
                                      { label: 'Key', key: 'key' },
                                    ],
                                    actions: [
                                      {
                                        label: 'Add',
                                        onClick: (form) => {
                                          set('settings.options', [
                                            ...(editable.settings?.options ??
                                              []),
                                            { ...form },
                                          ])
                                        },
                                      },
                                    ],
                                  })
                                }
                              />
                            </ListItemButton>
                          </List>
                        </Card>
                      </AnimateItem>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <AnimateItem>
                        <Card title="Display settings">Test</Card>
                      </AnimateItem>
                    </Grid>
                  </Grid>
                </AnimateGroup>
              ) : (
                <Card title="Unknown field type" animate>
                  {editable.type}
                </Card>
              )}
            </AnimateItem>
          </AnimateGroup>
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
      )}
    </DialogContext.Consumer>
  )
}

export default ModelsModelFieldDetail
