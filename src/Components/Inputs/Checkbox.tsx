import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'

export interface TextInputProps {
  label: string
  value: boolean
  onChange: (newValue: boolean) => void
}

const CheckboxInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
}) => (
  <FormControlLabel
    control={
      <Checkbox value={value} onChange={(e) => onChange(e.target.checked)} />
    }
    label={label}
  />
)

export default CheckboxInput
