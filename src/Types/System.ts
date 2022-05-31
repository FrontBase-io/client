import { AppService } from '../Utils/AppService'
import { PageType } from './Apps'
import { ModelType } from './Models'
import { CardProps } from '../Components/Card'
import { ListDetailLayoutProps } from '../Components/ListDetailLayout/ListDetailLayout'
import { TabProps } from '../Components/Tabs/Tabs'

export interface ObjectType {
  _id: string
  [key: string]: any
}

export interface ColourType {
  r: number
  g: number
  b: number
}

export class AppType {
  appService: AppService | null = null
  constructor(appService: AppService) {
    this.appService = appService
  }
  onAppStart: (() => void) | null = null
  onAppStop: (() => void) | null = null
  onGetPages: (callback: (pages: PageType[]) => void) => void = () => {}
}

export interface UIType {
  Card: React.FC<CardProps>
  Icon: React.FC<{
    icon: string
    style?: React.CSSProperties
  }>

  // Model
  Model: {
    Overview: React.FC<{ model: ModelType; baseUrl: string }>
    Object: React.FC<{
      model: ModelType
      baseUrl: string
      object: ObjectType
      layoutId: string
    }>
  }
  Layouts: {
    ListDetailLayout: React.FC<ListDetailLayoutProps>
  }
  Tabs: React.FC<TabProps>
}
