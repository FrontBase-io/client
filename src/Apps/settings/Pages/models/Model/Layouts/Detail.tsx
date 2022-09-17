import { Fab } from '@mui/material'
import { cloneDeep } from 'lodash'
import { useEffect } from 'react'
import Icon from '../../../../../../Components/Icon'
import LayoutDesigner from '../../../../../../Components/LayoutDesigner'
import DragItem from '../../../../../../Components/LayoutDesigner/Item'
import useEditable from '../../../../../../Helpers/useEditableModel'
import { ModelLayoutType } from '../../../../../../Types/Model'
import { useData } from '../../../../../../Utils/Data'
import { PageProps } from '../../../../../Types'
import PreviewCard from './PreviewComponents/Card'
import PreviewFields from './PreviewComponents/Fields'
import PreviewText from './PreviewComponents/Text'

const ModelLayoutDetail: React.FC<PageProps> = ({
  UI: {
    Card,
    Animation: { AnimateGroup, AnimateItem },
    Inputs: { TextInput },
  },
  item,
  itemKey,
  model,
}) => {
  // Vars
  const { editable, set, changed, update } = useEditable<ModelLayoutType>(item)
  const { updateModel } = useData()

  // Lifecycle
  useEffect(() => {
    update(item)
  }, [item])
  // Lifecycle

  // Functions

  // UI
  return (
    <>
      <AnimateGroup>
        <AnimateItem>
          <Card animate title={editable.label}>
            <TextInput
              label="Title"
              value={editable.label}
              onChange={(v) => set('label', v)}
            />
          </Card>
        </AnimateItem>
        <AnimateItem>
          <Card>
            <DragItem label="Text" type="text" />
            <DragItem label="Card" type="card" />
            <DragItem label="Fields" type="fields" />
          </Card>
        </AnimateItem>
        <AnimateItem>
          <Card animate title="Layout">
            <LayoutDesigner
              layout={editable.layout}
              onChange={(newLayout) => set('layout', cloneDeep([...newLayout]))}
              items={{
                text: {
                  label: 'Text',
                  preview: PreviewText,
                  settings: [{ label: 'Text', key: 'text', type: 'text' }],
                },
                card: {
                  label: 'Card',
                  nestable: true,
                  wrapper: PreviewCard,
                  settings: [
                    { label: 'Title', key: 'title', type: 'text' },
                    { label: 'Animate', key: 'animate', type: 'boolean' },
                    {
                      label: 'Without padding',
                      key: 'withoutPadding',
                      type: 'boolean',
                    },
                    {
                      label: 'Center',
                      key: 'center',
                      type: 'boolean',
                    },
                  ],
                },
                fields: {
                  label: 'Fields',
                  preview: PreviewFields,
                  settings: [
                    { label: 'Auto mode', key: 'auto', type: 'boolean' },
                  ],
                },
              }}
            />
          </Card>
        </AnimateItem>
      </AnimateGroup>
      {changed && (
        <Fab
          onClick={() => {
            const newLayouts = model.layouts
            newLayouts[itemKey] = editable
            updateModel(model.key, { layouts: newLayouts })
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

export default ModelLayoutDetail
