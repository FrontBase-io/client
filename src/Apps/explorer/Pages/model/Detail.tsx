import { PageProps } from '../../../Types'
import { ObjectType } from '../../../../Types/Object'
import { useEffect, useState } from 'react'
import Loading from '../../../../Components/Loading'
import { useParams } from 'react-router-dom'
import { useData } from '../../../../Utils/Data'
import ObjectDetail from '../../../../Components/App/Object/Detail'

const Detail: React.FC<PageProps> = ({ UI: { Card }, model }) => {
  // Vars
  const [object, setObject] = useState<ObjectType>()
  const { objectId } = useParams()
  const { getObjects } = useData()

  // Lifecycle
  useEffect(() => {
    getObjects({ model: model.key, filter: { _id: objectId } }, (results) => {
      setObject(results[0])
    })
  }, [objectId])
  // Functions

  // UI
  return object ? (
    <ObjectDetail
      object={object}
      model={model}
      baseUrl={`/explorer/${model.key_plural}`}
    />
  ) : (
    <Loading />
  )
}

export default Detail
