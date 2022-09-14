import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Card from '../Card'
import { ListItemType } from '../../Types/UI'
import Loading from '../Loading'
import Icon from '../Icon'
import { Link, useParams } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import { findLast } from 'lodash'
import UI from '../AppPageCanvas/UI'
import { PageProps } from '../../Apps/Types'
import Helpers from '../AppPageCanvas/Helpers'

export interface ListDetailLayoutProps {
  title: string
  list: ListItemType[] | undefined
  baseUrl: string
  component: FC<PageProps>
  componentProps?: { [key: string]: any }
  // 'Add new' list item
  add?: { icon?: string; label?: string; onAdd: () => void }
}

const ListDetailLayout: React.FC<ListDetailLayoutProps> = ({
  title,
  list,
  baseUrl,
  component,
  componentProps,
  add,
}) => {
  // Vars
  const [item, setItem] = useState<ListItemType>()
  const Component = component
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

  const params = useParams()

  // Lifecycle
  useEffect(() => {
    let itemKey = window.location.pathname.split(`${baseUrl}/`)[1]
    if (itemKey?.match('/')) itemKey = itemKey.split('/')[0]

    setItem(findLast(list, (i) => i.key === itemKey))
  }, [params, list])

  // Functions

  // UI
  return (
    <Grid container>
      {(!item || isLargeScreen) && (
        <Grid item xs={12} md={2}>
          <Card title={title} animate withoutPadding>
            <List disablePadding>
              {list ? (
                list.map((listitem) => (
                  <Link to={`${baseUrl}/${listitem.key}`} key={listitem.key}>
                    <ListItemButton selected={item?.key === listitem.key}>
                      {listitem.icon && (
                        <ListItemIcon>
                          <Icon icon={listitem.icon} />
                        </ListItemIcon>
                      )}
                      <ListItemText
                        primary={listitem.label}
                        secondary={listitem.hint}
                      />
                    </ListItemButton>
                  </Link>
                ))
              ) : (
                <Loading />
              )}
              {add && (
                <ListItemButton onClick={add.onAdd}>
                  <ListItemIcon>
                    <Icon icon={add.icon ?? 'plus'} />
                  </ListItemIcon>
                  <ListItemText primary={add.label ?? 'Add new'} />
                </ListItemButton>
              )}
            </List>
          </Card>
        </Grid>
      )}
      <Grid item xs={12} md={10}>
        {item && (
          <Component
            item={item.item}
            itemKey={item.key}
            UI={UI}
            helpers={Helpers}
            {...componentProps}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default ListDetailLayout
