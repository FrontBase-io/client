import { Grid } from '@mui/material'
import Card from '../Card'

export interface ListDetailLayoutProps {
  title: string
}

const ListDetailLayout: React.FC<ListDetailLayoutProps> = ({ title }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <Grid container>
      <Grid item xs={2}>
        <Card title={title} animate>
          Left
        </Card>
      </Grid>
      <Grid item xs={10}>
        <Card title={title} animate>
          Right
        </Card>
      </Grid>
    </Grid>
  )
}

export default ListDetailLayout
