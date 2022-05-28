import styles from './styles.module.scss'

const GridContainer: React.FC<{
  children: JSX.Element | JSX.Element[] | string
}> = ({ children }) => {
  // Vars

  // Lifecycle

  // UI
  return <div className={styles.row}>{children}</div>
}

export default GridContainer
