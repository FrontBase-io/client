import { uniq } from 'lodash'
import { useState } from 'react'
import { ModelType } from '../Types/Model'
import { useData } from '../Utils/Data'
import { ObjectType } from '../Types/Object'

export type useEditableType = <T>(original: T) => {
  editable: T
  changed: boolean
  updatedFields: string[]
  updateModel: () => void
  updateObject: () => void
  set: (field: string, value: any) => void
  update: (newOriginal: T) => void
}

const useEditable: useEditableType = (original) => {
  const [editable, setEditable] = useState(original)
  const [changed, setChanged] = useState<boolean>(false)
  const [updatedFields, setUpdatedFields] = useState<string[]>([])

  const { updateModel, updateObject } = useData()

  return {
    editable,
    changed,
    updatedFields,
    set: (field: string, value: any) => {
      setChanged(true)
      setUpdatedFields(uniq([...updatedFields, field]))
      setEditable({ ...editable, [field]: value })
    },
    updateModel: () => {
      const changedFields: { [key: string]: any } = {}
      //@ts-ignore
      updatedFields.map((f: string) => (changedFields[f] = editable[f]))
      updateModel((editable as ModelType).key, changedFields)
      setChanged(false)
    },
    updateObject: () => {
      const changedFields: { [key: string]: any } = {}
      //@ts-ignore
      updatedFields.map((f: string) => (changedFields[f] = editable[f]))
      updateObject((editable as ObjectType)._id, changedFields)
      setChanged(false)
    },
    update: (newOriginal) => {
      setChanged(false)
      setEditable(newOriginal)
    },
  }
}
export default useEditable
