import { Link } from 'react-router-dom'
import { AppType } from '../../Types/App'
import Icon from '../Icon'
import styles from './styles.module.scss'
import { getColor } from '../../Utils/Color'
import { Tooltip } from '@mui/material'

const AppIcon: React.FC<{ app: AppType }> = ({ app }) => (
  <Tooltip title={app.name} placement="right" arrow>
    <Link to={`/${app.key}`}>
      <div
        className={styles['app-icon']}
        style={{ backgroundColor: getColor(app.color) }}
      >
        <Icon icon={app.icon} size={24} />
      </div>
    </Link>
  </Tooltip>
)

export default AppIcon
