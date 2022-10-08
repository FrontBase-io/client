import SelectInput from 'Components/Inputs/Select'
import { ModelType } from 'Types/Model'

export interface EditListProps {
  fieldKey: string
  model: ModelType
  value: string | string[]
  onChange: (newValue: string) => void
}

const EditList: React.FC<EditListProps> = ({
  model,
  fieldKey,
  value,
  onChange,
}) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <SelectInput
      label={model.fields[fieldKey].name}
      options={model.fields[fieldKey].settings?.options ?? []}
      value={value}
      onChange={onChange}
    />
  )
}

export default EditList
