import { ModelLayoutItemType, ModelType } from '../../../Types/Model'
import LICard from './LayoutItems/Card'
import LIFields from './LayoutItems/Fields'

const LayoutItem: React.FC<{
  layoutItem: ModelLayoutItemType
  model: ModelType
}> = ({ layoutItem, model }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return layoutItem.type === 'card' ? (
    <LICard layoutItem={layoutItem} model={model}>
      {(layoutItem.items ?? []).map((li) => (
        <LayoutItem layoutItem={li} key={li.id} model={model} />
      ))}
    </LICard>
  ) : layoutItem.type === 'fields' ? (
    <LIFields layoutItem={layoutItem} model={model}>
      {(layoutItem.items ?? []).map((li) => (
        <LayoutItem layoutItem={li} key={li.id} model={model} />
      ))}
    </LIFields>
  ) : (
    <>Unknown LI type {layoutItem.type}</>
  )
}

export default LayoutItem
