import { Tabs as MUITabs, Tab } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { PageProps } from '../../Apps/Types'
import Helpers from '../AppPageCanvas/Helpers'
import UI from '../AppPageCanvas/UI'
import { useNavigate, useParams } from 'react-router-dom'

export interface TabProps {
  // Color the tabs white for use on a colored background
  white?: true
  // If baseURL is provided the component should also provide routing
  baseUrl?: string
  // Content of the tabs
  tabs: {
    label: string
    key: string
    component: FC<PageProps>
    props?: {}
  }[]
}

const Tabs: React.FC<TabProps> = ({ white, tabs, baseUrl }) => {
  // Vars
  const [value, setValue] = useState(tabs[0].key)
  const navigate = useNavigate()
  const params = useParams()
  // Lifecycle
  useEffect(() => {
    let itemKey = window.location.pathname.split(`${baseUrl}/`)[1]
    if (itemKey?.match('/')) itemKey = itemKey.split('/')[0]

    if (itemKey) setValue(itemKey)
    return () => setValue(tabs[0].key)
  }, [params])

  // Functions

  // UI
  return (
    <>
      <MUITabs
        value={value}
        onChange={(event: React.SyntheticEvent, newValue: string) => {
          if (baseUrl) {
            navigate(`${baseUrl}/${newValue}`)
          }

          setValue(newValue)
        }}
        aria-label="Tabs"
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
            <Component
              key={tab.key}
              UI={UI}
              helpers={Helpers}
              {...(tab.props ?? {})}
            />
          )
        )
      })}
    </>
  )
}

export default Tabs
