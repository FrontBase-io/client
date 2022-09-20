import { IconButton, MenuItem } from '@mui/material'
import MUIMenu from '@mui/material/Menu'
import { useState } from 'react'
import Icon from './Icon'

export interface MenuItemType {
  label: string
  key: string
  onClick: () => void
}

const Menu: React.FC<{
  icon?: string
  label: string
  items?: MenuItemType[]
}> = ({ icon, label, items }) => {
  // Vars
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // Lifecycle

  // Functions

  // UI
  return (
    <>
      {icon ? (
        <IconButton
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget)
          }}
        >
          <Icon icon={icon} />
        </IconButton>
      ) : (
        label
      )}
      {(items ?? []).length > 0 && (
        <MUIMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {items!.map((item) => (
            <MenuItem
              key={item.key}
              onClick={() => {
                setAnchorEl(null)
                item.onClick()
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </MUIMenu>
      )}
    </>
  )
}

export default Menu
