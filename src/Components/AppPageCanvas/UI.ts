import { FC } from 'react'
import Card, { CardProps } from '../Card'
import Tabs, { TabProps } from '../Tabs'
import ListDetailLayout, {
  ListDetailLayoutProps,
} from '../ListDetailLayout/index'
import TextInput, { TextInputProps } from '../Inputs/Text'
import Icon, { IconProps } from '../Icon'
import SelectInput, { SelectInputType } from '../Inputs/Select'

const UI: UIType = {
  Card,
  Tabs,
  ListDetailLayout,
  Inputs: { TextInput, SelectInput },
  Icon,
}
export default UI

export interface UIType {
  Card: FC<CardProps>
  Tabs: FC<TabProps>
  ListDetailLayout: FC<ListDetailLayoutProps>
  Inputs: { TextInput: FC<TextInputProps>; SelectInput: FC<SelectInputType> }
  Icon: FC<IconProps>
}
