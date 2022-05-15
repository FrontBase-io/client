import { useParams } from 'react-router-dom'

const Page: React.FC = () => {
  // Vars
  const params = useParams()
  // Lifecycle

  // UI
  return <>{params.pageId}</>
}

export default Page
