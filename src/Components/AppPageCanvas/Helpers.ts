import useEditableModel from '../../Helpers/useEditableModel'
import { ModelType } from '../../Types/Model'

const Helpers: HelpersType = { useEditableModel }
export default Helpers

export interface HelpersType {
  useEditableModel: (model: ModelType) => {
    editable: ModelType
    changed: boolean
    set: (field: string, value: any) => void
    save: () => void
    update: (model: ModelType) => void
  }
}
