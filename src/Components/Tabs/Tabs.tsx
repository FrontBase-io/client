import { TabPanel, TabView } from 'primereact/tabview'
import { useState } from 'react'
import { UIType } from '../../Types/System'
import UI from '../UI'

export interface TabProps {
  tabs: { label: string; component: React.FC<{ UI: UIType }> }[]
}

const Tabs: React.FC<TabProps> = ({ tabs }) => {
  // Vars
  const [activeIndex, setActiveIndex] = useState<number>()
  // Lifecycle

  // UI
  return (
    <TabView
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)}
      panelContainerStyle={{
        backgroundColor: 'transparent',
        padding: 0,
        margin: 0,
      }}
      className="white-tabs"
    >
      {tabs.map((tab) => {
        const Component = tab.component
        return (
          <TabPanel header={tab.label}>
            <Component UI={UI} />
          </TabPanel>
        )
      })}
    </TabView>
  )
}

export default Tabs
