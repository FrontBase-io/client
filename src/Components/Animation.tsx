import { motion } from 'framer-motion'

const AnimateRight: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <motion.span
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1, paddingLeft: 0 }}
    style={{
      paddingLeft: 10,
      opacity: 0,
    }}
  >
    {children}
  </motion.span>
)
const AnimateLeft: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <motion.span
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1, paddingRight: 0 }}
    transition={{
      default: { duration: 0.3 },
    }}
    style={{
      paddingRight: 5,
      opacity: 0,
    }}
  >
    {children}
  </motion.span>
)

const AnimateBottom: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <motion.span
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1, paddingTop: 0 }}
    transition={{
      default: { duration: 0.3 },
    }}
  >
    {children}
  </motion.span>
)
const AnimateTop: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <motion.span
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1, paddingBottom: 0 }}
    transition={{
      default: { duration: 0.3 },
    }}
    style={{
      paddingBottom: 5,
      opacity: 0,
    }}
  >
    {children}
  </motion.span>
)

const Animate: React.FC<{
  children: JSX.Element
  direction?: 'left' | 'right' | 'up' | 'down'
}> = ({ children, direction }) =>
  direction === 'right' ? (
    <AnimateRight>{children}</AnimateRight>
  ) : direction === 'left' ? (
    <AnimateLeft>{children}</AnimateLeft>
  ) : direction === 'down' ? (
    <AnimateTop>{children}</AnimateTop>
  ) : (
    <AnimateBottom>{children}</AnimateBottom>
  )

export default Animate
