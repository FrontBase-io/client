import FourOhFour from '../../../Components/FourOhFour'
import { AppService } from '../../../Utils/AppService'

// Pages
import AppSettings from './Pages/Settings'

export class App {
  appService: AppService | null = null

  constructor(appService: AppService) {
    this.appService = appService
  }

  // On app start
  onAppStart = () => {
    console.log('App has started! :)')
  }

  // On get pages
  onGetPages = () =>
    new Promise((resolve, reject) => {
      resolve([
        { label: 'Settings', key: 'settings', component: AppSettings },
        { label: 'SettingsOne', key: 'settingsOne', component: FourOhFour },
        { label: 'SettingsTwo', key: 'settingsTwo', component: FourOhFour },
        { label: 'SettingsThree', key: 'settingsThree', component: FourOhFour },
        { label: 'SettingsFour', key: 'settingsFour', component: FourOhFour },
      ])
    })

  // On app stop
  onAppStop = () => {
    console.log('App has stopped! :(')
  }
}
