import { AppPageType } from '../../Types/App'
import { useData } from '../../Utils/Data'

export default class App {
  getPages() {
    return new Promise<AppPageType[]>((resolve) => {
      const { getModels } = useData()
      getModels({ filter: {} }, (models) => {
        resolve(
          models.map((model) => ({
            label: model.label_plural,
            key: model.key_plural,
            icon: model.icon,
            content: { type: 'code', pageKey: 'overview' },
            props: { model },
          }))
        )
      })
    })
  }
}
