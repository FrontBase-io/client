import { AppService } from '../Utils/AppService'
import { PageType } from './Apps'
import { ModelType } from './Models'

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
  Card: React.FC<{
    title?: JSX.Element | string
    children?: JSX.Element | string
    animate?: true
  }>
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
}
