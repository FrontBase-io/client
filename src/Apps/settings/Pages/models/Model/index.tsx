import { PageProps } from '../../../../Types'
import FourOhFour from '../../../../../Components/FourOhFour'
import ModelsModelModel from './Model/index'
import ModelsModelFields from './Fields/index'
import ModelsOverviews from './Overviews'

const ModelsModel: React.FC<PageProps> = ({ UI: { Tabs }, item }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <Tabs
      white
      baseUrl={`/settings/models/${item.key_plural}`}
      tabs={[
        {
          label: 'Model',
          key: 'model',
          component: ModelsModelModel,
          props: { model: item },
        },
        {
          label: 'Fields',
          key: 'fields',
          component: ModelsModelFields,
          props: { model: item },
        },
        {
          label: 'Overviews',
          key: 'overviews',
          component: ModelsOverviews,
          props: { model: item },
        },
        { label: 'Layouts', key: 'layouts', component: FourOhFour },
        { label: 'Permissions', key: 'permissions', component: FourOhFour },
      ]}
    />
  )
}

export default ModelsModel
