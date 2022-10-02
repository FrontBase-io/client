import { ModelType } from 'Types/Model'
import { NewObjectType, ObjectType } from 'Types/Object'

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

  // Get object
  const getObject: (
    modelKey: string,
    id: string,
    then: (data: ObjectType) => void
  ) => void = (modelKey, id, then) => {
    getObjects({ model: modelKey, id }, (objects) => then(objects[0]))
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

  const getModel: (key: string, then: (model: ModelType) => void) => void = (
    key,
    then
  ) => {
    getModels({ filter: { key } }, (models) => then(models[0]))
  }

  // Save model
  const updateModel = (key: string, changes: { [key: string]: any }) => {
    Server.emit('update-model', key, changes, () => {
      // Todo: handle response
    })
  }

  // Update object
  const updateObject = (key: string, changes: { [key: string]: any }) => {
    Server.emit('update-object', key, changes, () => {
      // Todo: handle response
    })
  }

  // Update object
  const addModel: (input: {
    label: string
    label_plural: string
    key: string
    key_plural: string
    icon: string
  }) => void = (input) => {
    Server.emit('new-model', input, () => {
      // Todo: handle response
    })
  }

  const insertObject: (modelId: string, object: NewObjectType) => void = (
    modelId,
    object
  ) => {
    Server.emit('insert-object', modelId, object, () => {
      // Todo: handle response
    })
  }

  return {
    getObjects,
    getObject,
    getModels,
    getModel,
    updateModel,
    updateObject,
    addModel,
    insertObject,
  }
}
