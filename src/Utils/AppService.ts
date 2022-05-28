import {
  ModelResponseType,
  ObjectResponseType,
  SingleObjectResponseType,
} from '../Types/Server'
import Server from './Socket'
import { AppType } from '../Types/Apps'
import { setGlobal } from 'reactn'
import { ObjectType } from '../Types/System'

export class AppService {
  app: AppType | undefined = undefined

  // Get objects
  getObjects = (
    modelId: string,
    filter: { [key: string]: any } = {},
    respond: (objects: ObjectType[]) => void
  ) => {
    const onReceive = (objects: ObjectType[]) => respond(objects)

    Server.emit('getObjects', modelId, filter, (queryKey: string) => {
      Server.on(`receive-${queryKey}`, (response: ObjectResponseType) => {
        if (response.success) {
          onReceive(response.data!)
        } else {
          console.error(response.reason)
        }
      })
    })
  }
  getObject = (objectId: string, respond: (object: ObjectType) => void) => {
    const onReceive = (object: ObjectType) => respond(object)

    Server.emit('getObject', objectId, (queryKey: string) => {
      Server.on(`receive-${queryKey}`, (response: SingleObjectResponseType) => {
        if (response.success) {
          onReceive(response.data!)
        } else {
          console.error(response.reason)
        }
      })
    })
  }

  // Get models
  getAllModels = (then: (response: ModelResponseType) => void) => {
    Server.emit('getAllModels', then)
  }
  getModel = (modelId: string, then: (response: ModelResponseType) => void) => {
    Server.emit('getModel', modelId, then)
  }

  // Report error
  error = (error: string) => {
    setGlobal({ error })
  }

  // Page lifecycle
  registerPage = (page: { title?: string; up?: string }) => {
    if (page.title) setGlobal({ pageTitle: page.title })
    if (page.up) setGlobal({ pageUp: page.up })
    return () => {
      setGlobal({ pageTitle: null, pageUp: null })
    }
  }
}

const appService = new AppService()
export default appService
