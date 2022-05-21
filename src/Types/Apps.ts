import { ColourType, ObjectType, UIType } from './System'

export interface AppType extends ObjectType {
  name: string
  icon: string
  colour: ColourType
  key: string
  provider: string
}

export interface PageType {
  label: string
  key: string
  component: React.FC<{ UI: UIType }>
}
