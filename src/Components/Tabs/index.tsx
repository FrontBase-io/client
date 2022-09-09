import { Tabs as MUITabs, Tab } from '@mui/material'
import { FC, useState } from 'react'
import { PageProps } from '../../Apps/Types'
import UI from '../AppPageCanvas/UI'

export interface TabProps {
  white?: true
  tabs: {
    label: string
    key: string
    component: FC<PageProps>
    componentProps?: {}
  }[]
}

const Tabs: React.FC<TabProps> = ({ white, tabs }) => {
  // Vars
  const [value, setValue] = useState(tabs[0].key)

  // Lifecycle

  // Functions

  // UI
  return (
    <>
      <MUITabs
        value={value}
        onChange={(event: React.SyntheticEvent, newValue: string) => {
          setValue(newValue)
        }}
        aria-label="basic tabs example"
        TabIndicatorProps={white && { sx: { backgroundColor: 'white' } }}
        textColor="inherit"
      >
        {tabs.map((tab) => (
          <Tab
            label={tab.label}
            sx={white && { color: 'white' }}
            value={tab.key}
            key={tab.key}
          />
        ))}
      </MUITabs>
      {tabs.map((tab) => {
        const Component = tab.component
        return (
          tab.key === value && (
            <Component key={tab.key} UI={UI} {...(tab.componentProps ?? {})} />
          )
        )
      })}
    </>
  )
}

export default Tabs
