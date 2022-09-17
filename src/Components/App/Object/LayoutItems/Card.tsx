import { ModelLayoutItemType, ModelType } from '../../../../Types/Model'
import Card from '../../../Card'

const LICard: React.FC<{
  layoutItem: ModelLayoutItemType
  children?: JSX.Element | JSX.Element[]
  model: ModelType
}> = ({ children, layoutItem }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <Card
      animate={layoutItem.settings?.animate}
      withoutPadding={layoutItem.settings?.withoutPadding}
      centered={layoutItem.settings?.centered}
      title={layoutItem.settings?.title}
    >
      {children ? children : <></>}
    </Card>
  )
}

export default LICard
