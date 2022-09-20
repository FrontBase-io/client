import { findLast } from 'lodash'
import { useEffect, useState } from 'react'
import Select from 'react-select'

export interface SelectInputOptionType {
  label: string
  key: string
}

export interface SelectInputType {
  label: string
  value: string | string[]
  onChange: (newValue: string) => void
  options: SelectInputOptionType[]
  clearable?: true
  multi?: true
  autoFocus?: true
}

const SelectInput: React.FC<SelectInputType> = ({
  label,
  value,
  options,
  clearable,
  multi,
  autoFocus,
  onChange,
}) => {
  // Vars
  const [selectedItem, setSelectedItem] = useState<{
    value: string
    label: string
  }>()

  // Lifecycle
  useEffect(() => {
    const selectedOption = findLast(options, (o) => o.key === value)
    if (selectedOption)
      setSelectedItem({
        value: selectedOption.key,
        label: selectedOption.label,
      })
  }, [value, options])

  // Functions

  // UI
  return (
    <label
      style={{
        fontSize: '.75rem',
        lineHeight: 2,
      }}
    >
      {label}
      <Select
        options={options.map((option) => ({
          value: option.key,
          label: option.label,
        }))}
        value={selectedItem}
        menuPortalTarget={document.body}
        onChange={(option) => {
          if (option?.value) onChange(option.value)
        }}
        styles={{
          control: (styles) => ({
            ...styles,
            zIndex: 9999,
          }),
          menuPortal: (styles) => ({ ...styles, zIndex: 9999 }),
          option: (styles, { isDisabled, isFocused, isSelected }) => {
            return {
              ...styles,
              cursor: isDisabled ? 'not-allowed' : 'default',

              ':active': {
                ...styles[':active'],
              },
            }
          },

          singleValue: (styles, { data }) => ({
            ...styles,
          }),
        }}
      />
    </label>
  )
}

export default SelectInput
