import { TextField } from '@mui/material'

export interface TextInputProps {
  label: string
  value: string
  onChange: (newValue: string) => void
  active?: boolean
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  active,
}) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value ?? ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      fullWidth
      autoFocus={active}
    />
  )
}

export default TextInput
