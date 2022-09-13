import { HelpersType } from '../Components/AppPageCanvas/Helpers'
import { UIType } from '../Components/AppPageCanvas/UI'

export interface PageProps {
  UI: UIType
  helpers: HelpersType
  [key: string]: any
}
