import styles from './List.module.scss'
import { motion } from 'framer-motion'

const List: React.FC<{ children: any; animated?: true }> = ({
  children,
  animated,
}) => {
  // Vars

  // Lifecycle

  // UI
  return animated ? (
    <motion.ul
      className={styles.list}
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
    </motion.ul>
  ) : (
    <ul className={styles.list}>{children}</ul>
  )
}

export default List
