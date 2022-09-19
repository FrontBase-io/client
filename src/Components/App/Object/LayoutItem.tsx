import { ModelLayoutItemType, ModelType } from '../../../Types/Model'
import { ObjectType } from '../../../Types/Object'
import LICard from './LayoutItems/Card'
import LIFields from './LayoutItems/Fields'
import LIText from './LayoutItems/Text'

export interface LayoutItemType {
  layoutItem: ModelLayoutItemType
  children?: JSX.Element | JSX.Element[]
  model: ModelType
  object: ObjectType
  viewMode: '___view' | string
  setViewMode: (viewMode: '___view' | string) => void
  setEditable: (field: string, value: any) => void
}

const LayoutItem: React.FC<{
  layoutItem: ModelLayoutItemType
  model: ModelType
  object: ObjectType
  viewMode: '___view' | string
  setViewMode: (viewMode: '___view' | string) => void
  setEditable: (field: string, value: any) => void
}> = ({ layoutItem, model, object, viewMode, setViewMode, setEditable }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return layoutItem.type === 'card' ? (
    <LICard
      layoutItem={layoutItem}
      model={model}
      object={object}
      viewMode={viewMode}
      setViewMode={setViewMode}
      setEditable={setEditable}
    >
      {(layoutItem.items ?? []).map((li) => (
        <LayoutItem
          layoutItem={li}
          key={li.id}
          model={model}
          object={object}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setEditable={setEditable}
        />
      ))}
    </LICard>
  ) : layoutItem.type === 'fields' ? (
    <LIFields
      layoutItem={layoutItem}
      model={model}
      object={object}
      viewMode={viewMode}
      setViewMode={setViewMode}
      setEditable={setEditable}
    >
      {(layoutItem.items ?? []).map((li) => (
        <LayoutItem
          layoutItem={li}
          key={li.id}
          model={model}
          object={object}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setEditable={setEditable}
        />
      ))}
    </LIFields>
  ) : layoutItem.type === 'text' ? (
    <LIText
      layoutItem={layoutItem}
      model={model}
      object={object}
      viewMode={viewMode}
      setViewMode={setViewMode}
      setEditable={setEditable}
    />
  ) : (
    <>Unknown LI type {layoutItem.type}</>
  )
}

export default LayoutItem
