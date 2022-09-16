import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export interface AnimateProps {
  children: JSX.Element
  direction?: 'left' | 'right' | 'up' | 'down'
}

const Animate: React.FC<AnimateProps> = ({ children, direction }) =>
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

export const AnimateGroup: React.FC<{
  children: JSX.Element[] | JSX.Element
}> = ({ children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.2,
          staggerChildren: 0.05,
          duration: 0.1,
        },
      },
    }}
    initial="hidden"
    animate="visible"
    style={{ height: '100%' }}
  >
    {children}
  </motion.div>
)

export const AnimateItem: React.FC<{
  children: JSX.Element[] | JSX.Element
}> = ({ children }) => (
  <motion.div
    className="item"
    variants={{
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    }}
  >
    {children}
  </motion.div>
)

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
