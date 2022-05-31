import { motion } from 'framer-motion'

const ListHeader: React.FC<{
  children: JSX.Element | string
  animated?: true
}> = ({ children, animated }) => {
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
      style={{ cursor: 'default', fontSize: '.95rem' }}
    >
      {children}
    </motion.li>
  ) : (
    <li style={{ cursor: 'default', fontSize: '.95rem' }}>{children}</li>
  )
}

export default ListHeader
