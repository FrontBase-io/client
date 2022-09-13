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
}

const ListDetailLayout: React.FC<ListDetailLayoutProps> = ({
  title,
  list,
  baseUrl,
  component,
}) => {
  // Vars
  const [item, setItem] = useState<ListItemType>()
  const Component = component
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

  const params = useParams()

  // Lifecycle
  useEffect(() => {
    setItem(
      findLast(
        list,
        (i) => i.key === window.location.pathname.split(`${baseUrl}/`)[1]
      )?.item
    )
  }, [params])

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
                    <ListItemButton>
                      {listitem.icon && (
                        <ListItemIcon>
                          <Icon icon={listitem.icon} />
                        </ListItemIcon>
                      )}
                      <ListItemText primary={listitem.label} />
                    </ListItemButton>
                  </Link>
                ))
              ) : (
                <Loading />
              )}
            </List>
          </Card>
        </Grid>
      )}
      <Grid item xs={12} md={10}>
        {item && <Component item={item} UI={UI} helpers={Helpers} />}
      </Grid>
    </Grid>
  )
}

export default ListDetailLayout
