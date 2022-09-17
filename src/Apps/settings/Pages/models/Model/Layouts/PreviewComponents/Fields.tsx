import Icon from '../../../../../../../Components/Icon'
import { ModelLayoutItemType } from '../../../../../../../Types/Model'

const PreviewFields: React.FC<{ layoutItem: ModelLayoutItemType }> = ({
  layoutItem,
}) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return layoutItem.settings?.auto ? (
    <>
      <Icon icon="auto-fix" />
      Auto mode
    </>
  ) : (
    <></>
  )
}

export default PreviewFields
