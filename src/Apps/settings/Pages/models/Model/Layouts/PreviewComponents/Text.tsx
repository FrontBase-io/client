import { ModelLayoutItemType } from '../../../../../../../Types/Model'

const PreviewText: React.FC<{ layoutItem: ModelLayoutItemType }> = ({
  layoutItem,
}) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return <>{layoutItem.settings?.text}</>
}

export default PreviewText
