import { ResponseType } from '../Types/Server'
import Server from './Socket'
import { AppType } from '../Types/Apps'

export class AppService {
  app: AppType | undefined = undefined

  getObjects = (modelId: string, then: (response: ResponseType) => void) => {
    Server.emit('getObjects', modelId, {}, then)
  }
}

const appService = new AppService()
export default appService
