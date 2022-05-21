import { ModelResponseType, ObjectResponseType } from '../Types/Server'
import Server from './Socket'
import { AppType } from '../Types/Apps'
import { setGlobal } from 'reactn'

export class AppService {
  app: AppType | undefined = undefined

  // Get objects
  getObjects = (
    modelId: string,
    then: (response: ObjectResponseType) => void
  ) => {
    Server.emit('getObjects', modelId, {}, then)
  }

  // Get models
  getAllModels = (then: (response: ModelResponseType) => void) => {
    Server.emit('getAllModels', then)
  }
  getModel = (modelId: string, then: (response: ModelResponseType) => void) => {
    Server.emit('getModel', modelId, then)
  }

  registerPage = (page: { title?: string }) => {
    if (page.title) setGlobal({ pageTitle: page.title })
    return () => {
      setGlobal({ pageTitle: null })
    }
  }
}

const appService = new AppService()
export default appService
