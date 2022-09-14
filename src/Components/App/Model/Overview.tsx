import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ModelType } from '../../../Types/Model'
import { ObjectType } from '../../../Types/Object'
import { useData } from '../../../Utils/Data'
import Card from '../../Card'

const ModelOverview: React.FC<{ model: ModelType }> = ({ model }) => {
  // Vars
  const [objects, setObjects] = useState<ObjectType[]>()
  const { getObjects } = useData()
  const navigate = useNavigate()

  // Lifecycle
  useEffect(() => {
    getObjects({ model: model.key }, (_objects) => setObjects(_objects))
    return () => setObjects([])
  }, [model])

  // Functions

  // UI
  return (
    <Card title={model.label_plural} animate>
      <Table>
        <TableHead>
          <TableRow>
            {(model.overviews['default']?.fields ?? []).map((field) => (
              <TableCell key={field}>{model.fields[field].name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {objects && (
          <TableBody>
            {objects.map((object) => (
              <TableRow
                key={object._id}
                onClick={() =>
                  navigate(`/explorer/${model.key_plural}/${object._id}`)
                }
              >
                {(model.overviews['default']?.fields ?? []).map((field) => (
                  <TableCell key={`${object._id}-${field}`}>
                    {object[field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </Card>
  )
}

export default ModelOverview
