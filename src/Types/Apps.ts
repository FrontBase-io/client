import { ReactNode } from 'react'
import { ColourType, ObjectType } from './System'

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
  component: React.FC<{}>
}
