import { useDrop } from 'react-dnd'
import { ModelLayoutItemType } from '../../Types/Model'
import { ItemTypes } from './ItemTypes'
import uniqid from 'uniqid'

import styles from './styles.module.scss'
import { cloneDeep } from 'lodash'

const Dropzone: React.FC<{
  onDropped: (newLayout: ModelLayoutItemType) => void
  children?: JSX.Element | JSX.Element[]
}> = ({ onDropped, children }) => {
  // Vars

  // Hooks
  const [{ isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(_item: ModelLayoutItemType, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) return
        onDropped(cloneDeep({ ..._item, id: uniqid() }))
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    []
  )

  // Lifecycle

  // Functions

  // UI
  return (
    <div
      ref={drop}
      className={styles.dropzone}
      style={isOverCurrent ? { backgroundColor: '#fdfdfd' } : {}}
    >
      {children}
      <div style={{ textAlign: 'center' }}>
        <>Drop components here</>
      </div>
    </div>
  )
}

export default Dropzone
