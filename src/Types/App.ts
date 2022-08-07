import { ColorType } from './Data'
import { ObjectType } from './Object'

export interface AppType extends ObjectType {
  name: string
  key: string
  color: ColorType
  icon: string
}
