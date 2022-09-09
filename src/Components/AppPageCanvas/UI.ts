import { FC } from 'react'
import Card, { CardProps } from '../Card'
import Tabs, { TabProps } from '../Tabs'
import ListDetailLayout, {
  ListDetailLayoutProps,
} from '../ListDetailLayout/index'

const UI: UIType = { Card, Tabs, ListDetailLayout }
export default UI

export interface UIType {
  Card: FC<CardProps>
  Tabs: FC<TabProps>
  ListDetailLayout: FC<ListDetailLayoutProps>
}
