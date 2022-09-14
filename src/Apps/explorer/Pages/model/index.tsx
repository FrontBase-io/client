import { PageProps } from '../../../Types'
import { Route, Routes } from 'react-router-dom'
import ModelOverview from './Overview'
import Detail from './Detail'

const Overview: React.FC<PageProps> = (props) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <Routes>
      <Route path={`:objectId/*`} element={<Detail {...props} />} />
      <Route path="/" element={<ModelOverview {...props} />} />
    </Routes>
  )
}

export default Overview
