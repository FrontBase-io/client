import { cloneDeep, uniq } from 'lodash'
import { useState } from 'react'
import { ModelType } from '../Types/Model'
import { useData } from '../Utils/Data'

export type useEditableType = <T>(original: T) => {
  editable: T
  changed: boolean
  updatedFields: string[]
  updateModel: () => void
  set: (field: string, value: any) => void
  update: (newOriginal: T) => void
}

const useEditable: useEditableType = (original) => {
  const [editable, setEditable] = useState(original)
  const [changed, setChanged] = useState<boolean>(false)
  const [updatedFields, setUpdatedFields] = useState<string[]>([])

  const { updateModel } = useData()

  return {
    editable,
    changed,
    updatedFields,
    set: (field: string, value: any) => {
      setChanged(true)
      setUpdatedFields(uniq([...updatedFields, field]))
      setEditable(cloneDeep({ ...editable, [field]: value }))
    },
    updateModel: () => {
      const changedFields: { [key: string]: any } = {}
      //@ts-ignore
      updatedFields.map((f: string) => (changedFields[f] = editable[f]))
      updateModel((editable as ModelType).key, changedFields)
      setChanged(false)
    },
    update: (newOriginal) => {
      setChanged(false)
      setEditable(newOriginal)
    },
  }
}
export default useEditable
