import { format } from 'date-fns'

const ViewDate: React.FC<{ date: Date }> = ({ date }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return date ? <>{format(new Date(date), 'dd-MM-yyyy')}</> : <></>
}

export default ViewDate
