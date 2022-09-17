import Card from '../../../../../../../Components/Card'
import { ModelLayoutItemType } from '../../../../../../../Types/Model'

const PreviewCard: React.FC<{
  children: JSX.Element | JSX.Element[]
  layoutItem: ModelLayoutItemType
}> = ({ children, layoutItem }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <Card
      title={layoutItem.settings?.title}
      withoutPadding={layoutItem.settings?.withoutPadding}
      animate={layoutItem.settings?.animate}
    >
      {children}
    </Card>
  )
}

export default PreviewCard
