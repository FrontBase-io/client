import { ObjectType } from '../../Types/System'
import { ModelType } from '../../Types/Models'
import Card from '../Card'

const ObjectLayout: React.FC<{
  object: ObjectType
  model: ModelType
  layoutId: string
}> = ({ model, object }) => {
  // Vars

  // Lifecycle

  // UI
  return (
    <Card animate title={object[model.primary]}>
      {JSON.stringify(object)}
    </Card>
  )
}

export default ObjectLayout
