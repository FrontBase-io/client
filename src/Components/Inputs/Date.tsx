import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

export interface DateInputProps {
  label: string
  value: string
  onChange: (newValue?: string) => void
}

const InputDate: React.FC<DateInputProps> = ({ label, value, onChange }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <DesktopDatePicker
      label={label}
      inputFormat="dd-mm-yyyy"
      value={value}
      onChange={(e) =>
        // @ts-ignore
        onChange(e)
      }
      renderInput={(params) => <TextField {...params} />}
    />
  )
}

export default InputDate
