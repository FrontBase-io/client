import { Fab } from '@mui/material'
import { useEffect } from 'react'
import Icon from '../../../../../../Components/Icon'
import LayoutDesigner from '../../../../../../Components/LayoutDesigner'
import DragItem from '../../../../../../Components/LayoutDesigner/Item'
import useEditable from '../../../../../../Helpers/useEditableModel'
import { ModelLayoutType } from '../../../../../../Types/Model'
import { useData } from '../../../../../../Utils/Data'
import { PageProps } from '../../../../../Types'
import { cloneDeep } from 'lodash'

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
            <DragItem name="Text" type="text" />
          </Card>
        </AnimateItem>
        <AnimateItem>
          <Card animate title="Layout">
            <LayoutDesigner
              layout={[...editable.layout]}
              onChange={(a) => {
                set('layout', cloneDeep(a))
                update({ ...item, layout: a })
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
