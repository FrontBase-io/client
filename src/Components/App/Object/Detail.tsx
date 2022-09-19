import { ObjectType } from '../../../Types/Object'
import { ModelType } from '../../../Types/Model'
import LayoutItem from './LayoutItem'
import { useContext, useEffect, useState } from 'react'
import useEditable from '../../../Helpers/useEditable'
import { AppContext } from '../../../App'

const ObjectDetail: React.FC<{
  object: ObjectType
  model: ModelType
  baseUrl: string
}> = ({ object, model, baseUrl }) => {
  // Vars
  const [viewMode, setViewMode] = useState<'___view' | string>('___view')
  const { setAppBar } = useContext(AppContext)

  const {
    editable,
    set: setEditable,
    updateObject,
    update,
  } = useEditable<ObjectType>(object)

  // Functions
  const save = () => {
    updateObject()
    setViewMode('___view')
  }

  // Lifecycle
  useEffect(() => {
    update(object)
  }, [object])
  useEffect(() => {
    setAppBar &&
      object[model.primary] &&
      setAppBar({
        label: editable[model.primary],
        up: baseUrl,
        actions:
          viewMode === '___view'
            ? [
                {
                  label: 'Edit',
                  icon: 'pencil',
                  onClick: () => setViewMode('edit'),
                  key: 'edit',
                },
              ]
            : [
                {
                  label: 'Save',
                  icon: 'content-save',
                  onClick: save,
                  key: 'save',
                },
              ],
      })

    return () => {
      setAppBar && setAppBar(null)
    }
  }, [editable, object, model, viewMode])

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
