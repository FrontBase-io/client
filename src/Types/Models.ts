export interface ModelType {
  _id: string
  key: string
  key_plural: string
  name: string
  name_plural: string
  icon?: string
  primary: string
  fields: { [fieldKey: string]: ModelFieldType }
  overviews: {
    default: ModelOverviewType
    [overviewKey: string]: ModelOverviewType
  }
}

export interface ModelFieldType {
  label: string
  type: 'text'
}

export interface ModelOverviewType {
  layout: {
    fields: string[]
  }
}
