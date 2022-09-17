import { ObjectType } from './Object'

export interface ModelType extends ObjectType {
  label: string
  label_plural: string
  key: string
  key_plural: string
  icon: string
  fields: { [key: string]: ModelFieldType }
  overviews: { [key: string]: ModelOverviewType }
}

export interface ModelFieldType {
  name: string
  type: 'text' | 'list' | 'number'
}

export interface ModelOverviewType {
  label: string
  fields: string[]
}

export interface ModelLayoutType {
  label: string
  layout: ModelLayoutItemType[]
}
export interface ModelLayoutItemType {
  id: string
  label: string
  type: 'text' | 'card'
  items: ModelLayoutItemType[]
  settings?: { [key: string]: any }
}
