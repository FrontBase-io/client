import styles from './styles.module.scss'
import { useGlobal } from 'reactn'
import { useEffect, useState } from 'react'

type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface GridItemProps {
  children: JSX.Element | string
  size: GridSize
  xs?: GridSize
  sm?: GridSize
  md?: GridSize
  lg?: GridSize
  xl?: GridSize
}

const GridItem: React.FC<GridItemProps> = ({
  children,
  size,
  xs,
  sm,
  md,
  lg,
  xl,
}) => {
  // Vars
  //@ts-ignore
  const [screenSize] = useGlobal('screenSize')
  const [colSize, setColSize] = useState<GridSize>(size)

  // Lifecycle
  useEffect(() => {
    switch (screenSize) {
      case 'xl':
        setColSize(xl || size)
        break
      case 'lg':
        setColSize(lg || size)
        break
      case 'md':
        setColSize(md || size)
        break
      case 'sm':
        setColSize(sm || size)
        break
      default:
        setColSize(xs || size)
    }
  }, [size, xs, sm, md, lg, xl, screenSize])

  // UI
  return <div className={styles[`col-${colSize}`]}>{children}</div>
}

export default GridItem
