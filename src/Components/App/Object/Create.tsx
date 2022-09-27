import useEditable from 'Helpers/useEditable'
import { ModelType } from 'Types/Model'
import LayoutItem from './LayoutItem'
import { NewObjectType } from 'Types/Object'
import { Button } from '@mui/material'
import { DialogContext } from 'App'

interface CreateObjectProps {
  model: ModelType
  layoutKey?: string
}

const CreateObject: React.FC<CreateObjectProps> = ({ model, layoutKey }) => {
  // Vars
  const { editable, set, insert } = useEditable<NewObjectType>({})
  // Lifecycle

  // Functions
  const layout = layoutKey
    ? model.layouts[layoutKey]
    : model.layouts['create'] ?? model.layouts['default']

  // UI
  return (
    <DialogContext.Consumer>
      {({ setDialog }) => (
        <>
          {layout.layout.map((layoutItem) => (
            <LayoutItem
              key={layoutItem.id}
              layoutItem={layoutItem}
              model={model}
              object={editable}
              setEditable={set}
            />
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={() => {
                insert(model.key)
                setDialog({ show: false })
              }}
            >
              Create {model.label}
            </Button>
          </div>
        </>
      )}
    </DialogContext.Consumer>
  )
}

export default CreateObject
