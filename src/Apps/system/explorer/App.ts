import { PageType } from '../../../Types/Apps'
import { AppService } from '../../../Utils/AppService'

// Pages
import AppViewModel from './Pages/Settings'

export class App {
  appService: AppService | null = null

  constructor(appService: AppService) {
    this.appService = appService
  }

  // On app start
  // onAppStart = () => {}

  // On get pages
  onGetPages = (callback: (pages: PageType[]) => void) => {
    this.appService?.getAllModels((response) => {
      if (response.success) {
        const pages: PageType[] = (response.data || []).map((model) => {
          return {
            label: model.name_plural,
            key: model.key,
            component: AppViewModel,
            props: { model },
          }
        })
        callback(pages)
      }
    })
  }

  // On app stop
  //onAppStop = () => {}
}
