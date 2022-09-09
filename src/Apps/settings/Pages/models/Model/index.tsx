import { useData } from '../../../../../Utils/Data'
import { PageProps } from '../../../../Types'
import { useEffect } from 'react'

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
