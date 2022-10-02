import SelectInput, { SelectInputOptionType } from 'Components/Inputs/Select'
import Loading from 'Components/Loading'
import { useEffect, useState } from 'react'
import { ModelType } from 'Types/Model'
import { useData } from 'Utils/Data'

export interface EditRelationshipProps {
  label: string
  from: string
  to: string
  value: string | string[]
  onChange: (newValue: string) => void
}

const EditRelationship: React.FC<EditRelationshipProps> = ({
  value,
  onChange,
  to,
  label,
}) => {
  // Vars
  const [objectOptions, setObjectOptions] = useState<SelectInputOptionType[]>()
  const [model, setModel] = useState<ModelType>()
  const { getModel, getObjects } = useData()

  // Lifecycle
  useEffect(() => {
    getModel(to, (_model) => setModel(_model))
  }, [to])
  useEffect(() => {
    if (model) {
      getObjects({ model: to, filter: {} }, (_objects) =>
        setObjectOptions(
          _objects.map((_o) => ({ label: _o[model.primary], key: _o._id }))
        )
      )
    }
  }, [model])

  // Functions

  // UI
  return objectOptions && model ? (
    <SelectInput
      label={label}
      value={value}
      options={objectOptions}
      onChange={onChange}
    />
  ) : (
    <Loading />
  )
}

export default EditRelationship
