import { motion } from 'framer-motion'
import { CSSProperties } from 'react'
import styles from './styles.module.scss'

const Card: React.FC<{
  title?: string
  children: JSX.Element | string
  animate?: true
  style?: CSSProperties
}> = ({ children, title, animate, style }) => {
  // Vars

  // Lifecycle

  // UI
  return (
    <motion.div
      animate={animate ? { y: 0, opacity: 1 } : {}}
      transition={
        animate
          ? {
              default: { duration: 0.01 },
            }
          : {}
      }
      className={`${styles.card} ${animate ? styles.animate : ''}`}
      style={style}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </motion.div>
  )
}

export default Card
