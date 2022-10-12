import {
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import { DialogContext } from 'App'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModelType } from 'Types/Model'
import { useData } from 'Utils/Data'
import Card from 'Components/Card'
import { ObjectType } from 'Types/Object'
import CreateObject from 'Components/App/Object/Create'

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
    <DialogContext.Consumer>
      {({ setDialog }) => (
        <Card title={model.label_plural} animate>
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {(model.overviews['default']?.actions?.global ?? []).map(
                (action, index) => (
                  <Button
                    variant="contained"
                    key={`action-${action}`}
                    onClick={() =>
                      setDialog({
                        show: true,
                        size: 'md',
                        title: `Create new ${model.label}`,
                        content: <CreateObject model={model} />,
                      })
                    }
                  >
                    Create
                  </Button>
                )
              )}
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  {(model.overviews['default']?.fields ?? []).map((field) => (
                    <TableCell key={field}>
                      {model.fields[field].name}
                    </TableCell>
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
                      {(model.overviews['default']?.fields ?? []).map(
                        (field) => (
                          <TableCell key={`${object._id}-${field}`}>
                            {object[field]}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </>
        </Card>
      )}
    </DialogContext.Consumer>
  )
}

export default ModelOverview
