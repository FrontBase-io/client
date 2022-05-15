import styles from './ListItem.module.scss'
import { Ripple } from 'primereact/ripple'
import { motion, useCycle } from 'framer-motion'

const ListItem: React.FC<{ children: any; animated?: true }> = ({
  children,
  animated,
}) => {
  // Vars

  // Lifecycle

  // UI
  return animated ? (
    <motion.li
      className={`p-ripple ${styles.li}`}
      variants={{
        open: {
          y: 0,
          opacity: 1,
          transition: {
            y: { stiffness: 1000, velocity: -100 },
          },
        },
        closed: {
          y: 10,
          opacity: 0,
          transition: {
            y: { stiffness: 1000 },
          },
        },
      }}
      whileTap={{ scale: 0.995 }}
    >
      {children} <Ripple />
    </motion.li>
  ) : (
    <li className={`p-ripple ${styles.li}`}>
      {children} <Ripple />
    </li>
  )
}

export default ListItem
