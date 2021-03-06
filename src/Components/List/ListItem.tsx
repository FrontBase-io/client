import styles from './ListItem.module.scss'
import { Ripple } from 'primereact/ripple'
import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

const ListItem: React.FC<{
  children: any
  animated?: true
  icon?: string
  onClick?: () => void
  style?: CSSProperties
}> = ({ children, animated, icon, onClick, style }) => {
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
      className={`${styles.li} p-ripple colouredRipple`}
      onClick={onClick}
      style={style}
    >
      {icon && <i className={`mdi mdi-${icon}`} style={{ marginRight: 12 }} />}
      {children} <Ripple />
    </motion.li>
  ) : (
    <li
      className={`p-ripple colouredRipple ${styles.li}`}
      onClick={onClick}
      style={style}
    >
      {icon && <i className={`mdi mdi-${icon}`} style={{ marginRight: 12 }} />}
      {children} <Ripple />
    </li>
  )
}

export default ListItem
