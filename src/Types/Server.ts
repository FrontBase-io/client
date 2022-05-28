import { ModelType } from './Models'
import { ObjectType } from './System'

export interface ResponseType {
  success: boolean
  reason?: string
}

export interface ModelResponseType extends ResponseType {
  data?: ModelType[]
}
export interface ObjectResponseType extends ResponseType {
  data?: ObjectType[]
}
export interface SingleObjectResponseType extends ResponseType {
  data?: ObjectType
}
