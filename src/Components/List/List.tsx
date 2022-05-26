import styles from './List.module.scss'
import { motion } from 'framer-motion'
import { Ripple } from 'primereact/ripple'

const List: React.FC<{ children: any; animated?: true }> = ({
  children,
  animated,
}) => {
  // Vars

  // Lifecycle

  // UI
  return animated ? (
    <motion.ul
      className={`${styles.list} p-ripple`}
      variants={{
        open: {
          transition: { staggerChildren: 0.07 },
        },
        closed: {
          transition: { staggerChildren: 0.01, staggerDirection: -1 },
        },
      }}
    >
      {children}
      <Ripple />
    </motion.ul>
  ) : (
    <ul className={`${styles.list} p-ripple`}>
      {children}
      <Ripple />
    </ul>
  )
}

export default List
