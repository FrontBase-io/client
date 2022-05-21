import { ComponentType, PageType } from '../../../Types/Apps'
import { AppService } from '../../../Utils/AppService'

// Pages
import AppViewModel from './Pages/Models/Overview'

export class App {
  appService: AppService | null = null

  constructor(appService: AppService) {
    this.appService = appService
  }

  // On app start
  // onAppStart = () => {}

  // On get pages
  onGetPages = (callback: (pages: PageType[]) => void) => {
    // Fetch all models from the server
    this.appService?.getAllModels((response) => {
      if (response.success) {
        // And return them as pages
        const pages: PageType[] = (response.data || []).map((model) => ({
          label: model.name_plural,
          key: model.key,
          icon: model.icon,
          component: AppViewModel as ComponentType,
          pageProps: { model },
        }))
        callback(pages)
      }
    })
  }

  // On app stop
  //onAppStop = () => {}
}
