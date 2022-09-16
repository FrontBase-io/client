import { uniqueId } from 'lodash'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

import styles from './styles.module.scss'
const DragItem: React.FC<{ name: string; type: 'text' }> = ({ name, type }) => {
  // Vars
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { type },
  }))

  // Lifecycle

  // Functions

  // UI
  return (
    <div ref={drag} className={styles.draggable}>
      {name}
    </div>
  )
}

export default DragItem
