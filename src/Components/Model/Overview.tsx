import { ModelOverviewType, ModelType } from '../../Types/Models'
import { Card, Icon } from '../UI'
import { useEffect, useState } from 'react'
import { ObjectType } from '../../Types/System'
import appService from '../../Utils/AppService'
import { Checkbox } from 'primereact/checkbox'
import Loading from '../Loading'
import styles from './Overview.module.scss'
import { Ripple } from 'primereact/ripple'
import { useNavigate } from 'react-router-dom'

const ModelOverview: React.FC<{
  model: ModelType
  overviewId?: string
  baseUrl: string
}> = ({ model, overviewId, baseUrl }) => {
  // Vars
  const [objects, setObjects] = useState<ObjectType[]>()
  const [selectedObjects, setSelectedObjects] = useState<string[]>([])
  const [overview, setOverview] = useState<ModelOverviewType | null>()
  const navigate = useNavigate()

  const toggleSelectedObject = (objectId: string) => {
    if (selectedObjects.includes(objectId)) {
      setSelectedObjects(selectedObjects.filter((value) => value !== objectId))
    } else {
      setSelectedObjects([...selectedObjects, objectId])
    }
  }

  // Lifecycle
  useEffect(() => {
    appService.getObjects(model.key, {}, (response) => {
      if (response.success) {
        setObjects(response.data)
      } else {
        appService.error(response.reason!)
      }
    })

    // On change of model, reset the objects to avoid a clash
    return () => {
      setObjects([])
      setOverview(null)
    }
  }, [model.key])
  useEffect(() => {
    setOverview(model.overviews[overviewId ?? 'default'])
  }, [overviewId, model])

  // UI
  if (!overview) return <Loading />
  return (
    <Card
      animate
      withoutPadding
      title={
        <>
          {model.icon && (
            <Icon
              icon={model.icon}
              style={{
                float: 'right',
                fontSize: '1.5rem',
                color: 'var(--primary-color)',
              }}
            />
          )}
          {model.name_plural}
        </>
      }
      className={styles.root}
    >
      {objects ? (
        <table>
          <thead>
            <tr>
              <th />
              {overview.layout.fields.map((fieldKey) => (
                <th key={fieldKey}>{model.fields[fieldKey]?.label ?? '??'}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {objects.map((object) => (
              <tr
                key={object._id}
                onClick={() =>
                  navigate(`${baseUrl}/${model.key_plural}/${object._id}`)
                }
              >
                <td>
                  <Checkbox
                    onChange={(e) => toggleSelectedObject(object._id)}
                    checked={selectedObjects.includes(object._id)}
                  ></Checkbox>
                </td>
                {overview.layout.fields.map((fieldKey) => (
                  <td key={fieldKey} className="p-ripple">
                    {object[fieldKey]} <Ripple />
                  </td>
                ))}{' '}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </Card>
  )
}

export default ModelOverview
function useHistory() {
  throw new Error('Function not implemented.')
}
