import { ObjectType } from '../Types/Object'
import Server from './Socket'

export const useData = () => {
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

  return {
    getObjects,
  }
}
