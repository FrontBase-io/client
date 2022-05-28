import FourOhFour from '../../../Components/FourOhFour'

// Pages
import AppSettings from './Pages/Settings'
import { AppType } from '../../../Types/System'

import { PageType } from '../../../Types/Apps'
import SettingsModels from './Pages/Models/index'

export class App extends AppType {
  override onGetPages = (callback: (pages: PageType[]) => void) => {
    callback([
      {
        header: true,
        label: 'System',
        key: 'header-system',
        items: [
          {
            label: 'Settings',
            key: 'settings',
            component: AppSettings,
            icon: 'cog',
          },
        ],
      },
      {
        header: true,
        label: 'Apps',
        key: 'header-apps',
        items: [
          {
            label: 'Models',
            key: 'models',
            component: SettingsModels,
            icon: 'webcam',
          },
        ],
      },
    ])
  }
}
