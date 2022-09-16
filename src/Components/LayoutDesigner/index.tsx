import { cloneDeep } from 'lodash'
import { ModelLayoutItemType } from '../../Types/Model'
import Dropzone from './DropZone'
import styles from './styles.module.scss'

const LayoutDesigner: React.FC<{
  layout: ModelLayoutItemType[]
  onChange: (newLayout: ModelLayoutItemType[]) => void
}> = ({ layout, onChange }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <div className={styles['layout-designer']}>
      <>{layout.map((l) => JSON.stringify(l))}</>
      <Dropzone
        onDropped={(droppedItem) =>
          onChange(cloneDeep([...layout, droppedItem]))
        }
      />
    </div>
  )
}

export default LayoutDesigner
