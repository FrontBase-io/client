import { ObjectType } from '../../../Types/Object'
import { ModelType } from '../../../Types/Model'

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
      <div>{JSON.stringify(object)}</div>
      <div>{JSON.stringify(model)}</div>
    </>
  )
}

export default ObjectDetail
