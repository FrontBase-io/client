import { ObjectType } from './Object'

export interface ModelType extends ObjectType {
  label: string
  label_plural: string
  key: string
  key_plural: string
  icon: string
  fields: { [key: string]: ModelFieldType }
}

export interface ModelFieldType {
  name: string
  type: 'text' | 'list' | 'number'
}
