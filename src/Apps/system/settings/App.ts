import FourOhFour from '../../../Components/FourOhFour'

// Pages
import AppSettings from './Pages/Settings'
import { AppType } from '../../../Types/System'

import { PageType } from '../../../Types/Apps'

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
    ])
  }
}
