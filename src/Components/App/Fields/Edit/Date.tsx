import InputDate from 'Components/Inputs/Date'
import { ModelType } from 'Types/Model'

export interface DateListProps {
  fieldKey: string
  model: ModelType
  value: string
  onChange: (newValue?: string) => void
}

const EditDate: React.FC<DateListProps> = ({
  fieldKey,
  model,
  value,
  onChange,
}) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <InputDate
      label={model.fields[fieldKey].name}
      value={value}
      onChange={onChange}
    />
  )
}

export default EditDate
