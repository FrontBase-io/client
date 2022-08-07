import { motion } from 'framer-motion'
import { CSSProperties } from 'react'
import styles from './styles.module.scss'

export interface CardProps {
  title?: string | JSX.Element
  children: JSX.Element | string
  animate?: true
  style?: CSSProperties
  className?: string
  withoutPadding?: true
  centered?: true
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  animate,
  style,
  className,
  withoutPadding,
  centered,
}) => {
  // Vars

  // Lifecycle

  // UI
  return (
    <div className={centered && 'center'}>
      <motion.div
        animate={animate ? { y: 0, opacity: 1 } : {}}
        transition={
          animate
            ? {
                default: { duration: 0.01 },
              }
            : {}
        }
        className={`${styles.card} ${animate ? styles.animate : ''} ${
          className ?? ''
        }${centered && ` ${styles.centered}`}`}
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
    </div>
  )
}

export default Card
