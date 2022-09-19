import { ObjectType } from '../../../Types/Object'
import { ModelType } from '../../../Types/Model'
import LayoutItem from './LayoutItem'
import { useEffect, useState } from 'react'
import useEditable from '../../../Helpers/useEditable'

const ObjectDetail: React.FC<{ object: ObjectType; model: ModelType }> = ({
  object,
  model,
}) => {
  // Vars
  const [viewMode, setViewMode] = useState<'___view' | string>('___view')
  const {
    editable,
    set: setEditable,
    updateObject,
    update,
  } = useEditable<ObjectType>(object)
  // Lifecycle
  useEffect(() => {
    update(object)
  }, [object])

  // Functions
  const save = () => {
    updateObject()
    setViewMode('___view')
  }

  // UI
  return (
    <div
      onKeyDown={(event) => {
        if (
          viewMode !== '___view' &&
          event.ctrlKey &&
          String.fromCharCode(event.which).toLowerCase() === 's'
        ) {
          save()
          event.preventDefault()
        } else if (event.which === 27) {
          setViewMode('___view')
          // setNewObject(appliedObject)
        }
      }}
    >
      {model.layouts['default'].layout.map((li) => (
        <LayoutItem
          key={li.id}
          layoutItem={li}
          model={model}
          object={editable}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setEditable={setEditable}
        />
      ))}
    </div>
  )
}

export default ObjectDetail
