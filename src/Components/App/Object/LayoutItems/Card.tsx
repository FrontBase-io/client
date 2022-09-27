import Card from 'Components/Card'
import { LayoutItemType } from '../LayoutItem'

const LICard: React.FC<LayoutItemType> = ({ children, layoutItem }) => {
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
