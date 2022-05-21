import FourOhFour from '../../../Components/FourOhFour'

// Pages
import AppSettings from './Pages/Settings'
import { AppType } from '../../../Types/System'
import { PageType } from '../../../Types/Apps'

export class App extends AppType {
  override onGetPages = (callback: (pages: PageType[]) => void) => {
    callback([
      { label: 'Settings', key: 'settings', component: AppSettings },
      { label: 'SettingsOne', key: 'settingsOne', component: FourOhFour },
      { label: 'SettingsTwo', key: 'settingsTwo', component: FourOhFour },
      { label: 'SettingsThree', key: 'settingsThree', component: FourOhFour },
      { label: 'SettingsFour', key: 'settingsFour', component: FourOhFour },
    ])
  }
}
