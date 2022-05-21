import React from 'react'
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
  component: React.FC<{ [propName: string]: any; UI: UIType }>
  icon?: string
  pageProps?: { [propName: string]: any }
}

export type ComponentType = React.FC<{ [propName: string]: any; UI: UIType }>
