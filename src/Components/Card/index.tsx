import { motion } from 'framer-motion'
import { CSSProperties } from 'react'
import styles from './styles.module.scss'

const Card: React.FC<{
  title?: string | JSX.Element
  children: JSX.Element | string
  animate?: true
  style?: CSSProperties
  className?: string
  withoutPadding?: true
}> = ({ children, title, animate, style, className, withoutPadding }) => {
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
      className={`${styles.card} ${animate ? styles.animate : ''} ${className}`}
      style={{ ...style, padding: withoutPadding ? '0' : '0.6rem' }}
    >
      {title && (
        <h2
          className={styles.title}
          style={{ margin: withoutPadding ? '0.6rem' : '0' }}
        >
          {title}
        </h2>
      )}
      {children}
    </motion.div>
  )
}

export default Card
