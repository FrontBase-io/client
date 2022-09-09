import { ModelType } from '../../../../../Types/Model'
import { PageProps } from '../../../../Types'

const ModelsModel: React.FC<PageProps> = ({ UI: { Card }, model }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <Card animate title="Model">
      {JSON.stringify(model)}
    </Card>
  )
}

export default ModelsModel
