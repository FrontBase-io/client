import { PageProps } from '../../../Types'
import { useParams } from 'react-router-dom'
import { ModelType } from '../../../../Types/Model'

const Overview: React.FC<PageProps> = ({ UI: { Card }, model }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <Card title={(model as ModelType).label_plural} animate>
      {JSON.stringify(model)}
    </Card>
  )
}

export default Overview
