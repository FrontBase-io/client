import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

import styles from './styles.module.scss'
const DragItem: React.FC<{
  label: string
  type: 'text' | 'card' | 'fields'
}> = ({ label, type }) => {
  // Vars
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { type, label },
  }))

  // Lifecycle

  // Functions

  // UI
  return (
    <div ref={drag} className={styles.draggable}>
      {label}
    </div>
  )
}

export default DragItem
