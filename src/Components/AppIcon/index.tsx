import styles from './styles.module.scss'

import { colour } from '../../Utils/Helpers/colours'
import { AppType } from '../../Types/Apps'

import { Ripple } from 'primereact/ripple'
import { Tooltip } from 'primereact/tooltip'
import { uniqueId } from 'lodash'

import { Link } from 'react-router-dom'

const AppIcon: React.FC<{ app: AppType; active?: boolean }> = ({
  app,
  active,
}) => {
  // Vars
  const appKey = `app-icon-${uniqueId()}`

  // Lifecycle

  // UI
  return (
    <Link
      to={`/${app.key}`}
      className={`${styles.iconWrapper} ${active ? styles.active : ''}`}
    >
      <Tooltip
        target={`#${appKey}`}
        content={app.name}
        position="right"
        event="hover"
        showDelay={0}
        disabled={active}
      />

      <div
        id={appKey}
        className={`${styles.appIcon}  p-ripple`}
        style={{ backgroundColor: colour(app.colour) }}
      >
        <i className={`mdi mdi-${app.icon}`}></i>
        <Ripple />
      </div>
    </Link>
  )
}

export default AppIcon
