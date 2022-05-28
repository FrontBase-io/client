import { useState } from 'react'
import { UIType } from '../../Types/System'
import Card from '../Card'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import List from '../List/List'
import ListItem from '../List/ListItem'
import UI from '../UI'
import { useGlobal } from 'reactn'

export interface ListDetailLayoutProps {
  list: { [key: string]: any }[]
  component: React.FC<{ UI: UIType; item: any }>
  primary: string
}

const ListDetailLayout: React.FC<ListDetailLayoutProps> = ({
  list,
  component,
  primary,
}) => {
  // Vars
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any }>()
  //@ts-ignore
  const [screenSize] = useGlobal('screenSize')
  // Lifecycle

  // UI

  const Component = component
  return (
    <GridContainer>
      {!selectedItem ||
      screenSize === 'md' ||
      screenSize === 'lg' ||
      screenSize === 'xl' ? (
        <GridItem size={3} xs={12} sm={12}>
          <Card title="Models" animate>
            <List animated>
              {list.map((listItem) => (
                <ListItem animated onClick={() => setSelectedItem(listItem)}>
                  {listItem[primary]}
                </ListItem>
              ))}
            </List>
          </Card>
        </GridItem>
      ) : (
        <></>
      )}
      {selectedItem ? (
        <GridItem size={9} xs={12} sm={12}>
          <Component UI={UI} item={selectedItem} />
        </GridItem>
      ) : (
        <></>
      )}
    </GridContainer>
  )
}

export default ListDetailLayout
