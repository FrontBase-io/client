import styles from './ListItem.module.scss'
import { Ripple } from 'primereact/ripple'
import { motion } from 'framer-motion'

const ListItem: React.FC<{
  children: any
  animated?: true
  icon?: string
}> = ({ children, animated, icon }) => {
  // Vars

  // Lifecycle

  // UI
  return animated ? (
    <motion.li
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
      className="p-ripple colouredRipple"
    >
      {icon && <i className={`pi pi-${icon}`} style={{ marginRight: 12 }} />}
      {children} <Ripple />
    </motion.li>
  ) : (
    <li className={`p-ripple ${styles.li}`}>
      {icon && <i className={`pi pi-${icon}`} style={{ marginRight: 12 }} />}
      {children} <Ripple />
    </li>
  )
}

export default ListItem
