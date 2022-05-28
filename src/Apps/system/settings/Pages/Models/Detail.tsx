import { UIType } from '../../../../../Types/System'

const ModelDetail: React.FC<{ UI: UIType; item: any }> = ({ UI, item }) => {
  // Vars

  // Lifecycle

  // UI
  return (
    <UI.Card title="Detail pane" animate>
      {JSON.stringify(item)}
    </UI.Card>
  )
}

export default ModelDetail
