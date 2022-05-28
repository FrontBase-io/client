import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ObjectType, UIType } from '../../../../../Types/System'
import appService from '../../../../../Utils/AppService'
import { useState } from 'react'
import { ModelType } from '../../../../../Types/Models'

const Detail: React.FC<{ UI: UIType; model: ModelType }> = ({ model }) => {
  // Vars
  let { objectId } = useParams()
  const [object, setObject] = useState<ObjectType>()

  // Lifecycle
  useEffect(() => {
    if (objectId) {
      appService.getObject(objectId, (_object) => setObject(_object))
    }
  }, [objectId])
  useEffect(() => {
    if (object) {
      const unregister = appService.registerPage({
        title: object[model.primary],
        up: `/explorer/${model.key_plural}`,
      })
      return () => unregister()
    }
  }, [object, model])

  // UI
  return <>Detail {JSON.stringify(object)}</>
}

export default Detail
