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
      {layout.map((l) => (
        <div key={l.id}>{l.id}</div>
      ))}
      <Dropzone
        onDropped={(droppedItem) => onChange([...layout, droppedItem])}
      />
    </div>
  )
}

export default LayoutDesigner
