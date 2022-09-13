import { uniq } from 'lodash'
import { useState } from 'react'
import { ModelType } from '../Types/Model'
import { useData } from '../Utils/Data'

const useEditableModel = (model: ModelType) => {
  const [editable, setEditable] = useState<ModelType>(model)
  const [changed, setChanged] = useState<boolean>(false)
  const [updatedFields, setUpdatedFields] = useState<string[]>([])

  const { updateModel } = useData()

  return {
    editable,
    changed,
    set: (field: string, value: any) => {
      setChanged(true)
      setUpdatedFields(uniq([...updatedFields, field]))
      setEditable({ ...editable, [field]: value })
    },
    save: () => {
      const changedFields: { [key: string]: any } = {}
      //@ts-ignore
      updatedFields.map((f: string) => (changedFields[f] = editable[f]))
      updateModel(editable.key, changedFields)
      setChanged(false)
    },
    update: (model: ModelType) => {
      setChanged(false)
      setEditable(model)
    },
  }
}
export default useEditableModel
