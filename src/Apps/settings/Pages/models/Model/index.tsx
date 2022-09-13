import { PageProps } from '../../../../Types'
import FourOhFour from '../../../../../Components/FourOhFour'
import ModelsModelModel from './Model/index'
import ModelsModelFields from './Fields/index'

const ModelsModel: React.FC<PageProps> = ({ UI: { Tabs }, item }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <Tabs
      white
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
        { label: 'Overviews', key: 'overviews', component: FourOhFour },
        { label: 'Layouts', key: 'layouts', component: FourOhFour },
        { label: 'Permissions', key: 'permissions', component: FourOhFour },
      ]}
    />
  )
}

export default ModelsModel
