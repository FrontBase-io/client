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

const ModelLayoutDetail: React.FC<PageProps> = ({
  UI: {
    Card,
    Animation: { AnimateGroup, AnimateItem },
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
          <Card animate title={item.label}>
            {JSON.stringify(editable)}
          </Card>
        </AnimateItem>
        <AnimateItem>
          <Card>
            <DragItem label="Text" type="text" />
            <DragItem label="Card" type="card" nestable />
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
                  settings: [{ label: 'Text', key: 'text', type: 'text' }],
                },
                card: {
                  label: 'Card',
                  nestable: true,
                  preview: PreviewCard,
                  settings: [
                    { label: 'Animate', key: 'animate', type: 'boolean' },
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
