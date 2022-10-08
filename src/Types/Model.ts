import { ObjectType } from './Object'

export interface ModelType extends ObjectType {
  label: string
  label_plural: string
  key: string
  key_plural: string
  icon: string
  primary: string
  fields: { [key: string]: ModelFieldType }
  overviews: { [key: string]: ModelOverviewType }
  layouts: { [key: string]: ModelLayoutType }
}

export interface ModelFieldType {
  name: string
  type: 'text' | 'number' | 'date' | 'list' | 'relationship' | 'formula'
  settings?: {
    // List
    options?: { label: string; key: string }[]
    [key: string]: any
  }
}

export interface ModelOverviewType {
  label: string
  fields: string[]
  actions?: {
    single?: ModelOverviewActionType[]
    multiple?: ModelOverviewActionType[]
    global?: ModelOverviewActionType[]
  }
}

export interface ModelOverviewActionType {
  type: 'create'
}

export interface ModelLayoutType {
  label: string
  layout: ModelLayoutItemType[]
}
export interface ModelLayoutItemType {
  id: string
  label: string
  type: 'text' | 'card' | 'fields'
  items: ModelLayoutItemType[]
  settings?: { [key: string]: any }
}
