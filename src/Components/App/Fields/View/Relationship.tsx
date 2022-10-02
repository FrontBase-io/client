import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ModelType } from 'Types/Model'
import { ObjectType } from 'Types/Object'
import { useData } from 'Utils/Data'

const ViewRelationship: React.FC<{ modelKey: string; to: string }> = ({
  modelKey,
  to,
}) => {
  // Vars
  const [object, setObject] = useState<ObjectType>()
  const [model, setModel] = useState<ModelType>()
  const { getObject, getModel } = useData()

  // Lifecycle
  useEffect(() => {
    getObject(modelKey, to, (_object) => setObject(_object))
    getModel(modelKey, (_model) => setModel(_model))
  }, [to])

  // Functions

  // UI
  return (
    <div>
      {model && object && (
        <Link to={`/o/${to}`} style={{ fontWeight: 400 }}>
          {object[model.primary]}
        </Link>
      )}
    </div>
  )
}

export default ViewRelationship
