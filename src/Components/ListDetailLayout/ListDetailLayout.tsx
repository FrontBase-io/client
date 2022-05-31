import { useState } from 'react'
import { UIType } from '../../Types/System'
import Card from '../Card'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import List from '../List/List'
import ListItem from '../List/ListItem'
import UI from '../UI'
import { useGlobal } from 'reactn'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

export interface ListDetailLayoutProps {
  // The list of items
  list: { [key: string]: any }[]
  // The component to render when an item is selected
  component: React.FC<{ UI: UIType; item: any }>
  // The primary label of the list
  primary: string
  // The base URL
  baseUrl: string
  // Optional: key to use for navigation instead of ID
  linkKey?: string
}

const ListDetailLayout: React.FC<ListDetailLayoutProps> = ({
  list,
  component,
  primary,
  baseUrl,
  linkKey,
}) => {
  // Vars
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any }>()
  //@ts-ignore
  const [screenSize] = useGlobal('screenSize')
  const navigate = useNavigate()
  const params = useParams()

  // Lifecycle

  // UI

  const Component = component
  return (
    <GridContainer>
      {params['*'] === '' ||
      screenSize === 'md' ||
      screenSize === 'lg' ||
      screenSize === 'xl' ? (
        <GridItem size={3} xs={12} sm={12}>
          <Card title="Models" animate>
            <List animated>
              {list.map((listItem) => (
                <ListItem
                  animated
                  onClick={() =>
                    navigate(
                      `${baseUrl}/${linkKey ? listItem[linkKey] : listItem._id}`
                    )
                  }
                >
                  {listItem[primary]}
                </ListItem>
              ))}
            </List>
          </Card>
        </GridItem>
      ) : (
        <></>
      )}

      <GridItem size={9} xs={12} sm={12}>
        <Routes>
          {list.map((listItem) => (
            <Route
              path={linkKey ? listItem[linkKey] : listItem._id}
              key={linkKey ? listItem[linkKey] : listItem._id}
              element={<Component UI={UI} item={listItem} />}
            />
          ))}
        </Routes>
      </GridItem>
    </GridContainer>
  )
}

export default ListDetailLayout
