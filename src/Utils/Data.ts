import { ModelType } from '../Types/Model'
import { ObjectType } from '../Types/Object'
import Server from './Socket'

export const useData = () => {
  // Get objects
  const getObjects: (
    args: {
      model: string
      filter?: { [key: string]: any }
      id?: string
    },
    then: (data: ObjectType[]) => void
  ) => void = ({ model, filter, id }, then) => {
    const appliedFilter = { _id: id, ...(filter ?? {}) }
    Server.emit('getObjects', model, appliedFilter, (queryId: string) => {
      Server.on(`receive-${queryId}`, ({ success, data }) => {
        if (success) {
          then(data)
        } else {
          alert('Todo: handle error')
        }
      })
    })
  }

  // Get models
  const getModels: (
    args: { filter: {} },
    then: (models: ModelType[]) => void
  ) => void = (args, then) => {
    Server.emit('getModels', args.filter ?? {}, (queryId: string) => {
      Server.on(`receive-${queryId}`, ({ success, data }) => {
        if (success) {
          then(data)
        } else {
          alert('Todo: handle error')
        }
      })
    })
  }

  // Save model
  const updateModel = (key: string, changes: { [key: string]: any }) => {
    Server.emit('update-model', key, changes, () => {
      // Todo: handle response
    })
  }
  return {
    getObjects,
    getModels,
    updateModel,
  }
}
