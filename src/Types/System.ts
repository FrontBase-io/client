import { AppService } from '../Utils/AppService'
import { PageType } from './Apps'

export interface ObjectType {
  _id?: string
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
    title?: string
    children?: JSX.Element | string
    animate?: true
  }>
}
