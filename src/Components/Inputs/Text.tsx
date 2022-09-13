import { TextField } from '@mui/material'
import { ChangeEvent } from 'react'

export interface TextInputProps {
  label: string
  value: string
  onChange: (newValue: string) => void
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      fullWidth
    />
  )
}

export default TextInput
