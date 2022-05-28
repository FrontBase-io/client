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
  icon?: string

  component: React.FC<{ [propName: string]: any; UI: UIType }>
  pageProps?: { [propName: string]: any }

  detailComponent?: React.FC<any>
  detailPageProps?: { [propName: string]: any }
}

export type ComponentType = React.FC<{ [propName: string]: any; UI: UIType }>
