import { AppService } from '../../../Utils/AppService'

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
        { label: 'Settings', key: 'settings' },
        { label: 'SettingsOne', key: 'settingsOne' },
        { label: 'SettingsTwo', key: 'settingsTwo' },
        { label: 'SettingsThree', key: 'settingsThree' },
        { label: 'SettingsFour', key: 'settingsFour' },
      ])
    })

  // On app stop
  onAppStop = () => {
    console.log('App has stopped! :(')
  }
}
