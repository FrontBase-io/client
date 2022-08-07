import { CircularProgress } from '@mui/material'
import { CSSProperties } from 'react'

const Loading: React.FC<{ style?: CSSProperties }> = ({ style }) => {
  // Vars

  // Lifecycle

  // UI
  return (
    <div className="center" style={style}>
      <CircularProgress />
    </div>
  )
}

export default Loading
