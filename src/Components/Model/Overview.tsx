import { ModelType } from '../../Types/Models'
import { Card, Icon } from '../UI'
import { useEffect, useState } from 'react'
import { ObjectType } from '../../Types/System'
import appService from '../../Utils/AppService'
import { Checkbox } from 'primereact/checkbox'

const ModelOverview: React.FC<{ model: ModelType }> = ({ model }) => {
  // Vars
  const [objects, setObjects] = useState<ObjectType[]>()
  const [selectedObjects, setSelectedObjects] = useState<string[]>([])

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
  }, [model.key])
  // UI
  return (
    <Card
      animate
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
    >
      {objects ? (
        <table>
          <thead>
            <tr>
              <th />
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {objects.map((object) => (
              <tr key={object._id}>
                <td>
                  <Checkbox
                    onChange={(e) => toggleSelectedObject(object._id)}
                    checked={selectedObjects.includes(object._id)}
                  ></Checkbox>
                </td>
                <td>{object[model.primary]}</td>
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
