import { ObjectType } from '../../../Types/Object'
import { ModelLayoutItemType, ModelType } from '../../../Types/Model'
import LayoutItem from './LayoutItem'

const ObjectDetail: React.FC<{ object: ObjectType; model: ModelType }> = ({
  object,
  model,
}) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <>
      {model.layouts['default'].layout.map((li) => (
        <LayoutItem key={li.id} layoutItem={li} model={model} />
      ))}
    </>
  )
}

export default ObjectDetail
