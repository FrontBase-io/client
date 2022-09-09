import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Card from '../Card'
import { ListItemType } from '../../Types/UI'
import Loading from '../Loading'
import Icon from '../Icon'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { findLast } from 'lodash'

export interface ListDetailLayoutProps {
  title: string
  list: ListItemType[] | undefined
  baseUrl: string
}

const ListDetailLayout: React.FC<ListDetailLayoutProps> = ({
  title,
  list,
  baseUrl,
}) => {
  // Vars
  const [detailPageId, setDetailPageId] = useState(
    window.location.pathname.split(`${baseUrl}/`)[1]
  )
  const [item, setItem] = useState()

  const params = useParams()

  // Lifecycle
  useEffect(() => {
    setDetailPageId(window.location.pathname.split(`${baseUrl}/`)[1])
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
      <Grid item xs={2}>
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
      <Grid item xs={10}>
        {item && (
          <Card title={title} animate>
            {JSON.stringify(item)}
          </Card>
        )}
      </Grid>
    </Grid>
  )
}

export default ListDetailLayout
