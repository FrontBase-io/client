import { ColourType, ObjectType } from './System'

export interface AppType extends ObjectType {
  name: string
  icon: string
  colour: ColourType
  key: string
}
