import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ObjectType, UIType } from '../../../../../Types/System'
import appService from '../../../../../Utils/AppService'
import { useState } from 'react'
import { ModelType } from '../../../../../Types/Models'
import UI from '../../../../../Components/UI'
import Loading from '../../../../../Components/Loading'

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
  if (!object) return <Loading />
  return <UI.Model.Object object={object} model={model} layoutId="default" />
}

export default Detail
