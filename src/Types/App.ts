import { ColorType } from './Data'
import { ObjectType } from './Object'

export interface AppType extends ObjectType {
  name: string
  key: string
  color: ColorType
  icon: string
  pages: AppPageType[]
  code?: string
  dynamic_pages?: true
}

export interface AppPageType {
  label: string
  key: string
  icon: string
  content: { type: 'code' | 'layout'; pageKey?: string }
  props?: { [key: string]: any }
}
