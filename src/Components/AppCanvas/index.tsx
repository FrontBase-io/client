import { AppPageType, AppType } from '../../Types/App'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { findLast } from 'lodash'
import { AppContext } from '../../App'
import Card from '../Card'

const AppCanvas: React.FC<{ app?: AppType }> = ({ app }) => {
  // Vars
  const [page, setPage] = useState<AppPageType>()
  const { pageId } = useParams()

  // Hooks
  const { setAppBar } = useContext(AppContext)

  // Lifecycle
  useEffect(() => {
    setPage(findLast(app?.pages, (p) => p.key === pageId))
  }, [pageId])
  useEffect(() => {
    if (setAppBar && page) {
      setAppBar({ label: page.label })
    }
    return () => {
      if (setAppBar) setAppBar(null)
    }
  }, [page])
  // Functions

  // UI
  return <Card title={page?.label}>{JSON.stringify(page)}</Card>
}

export default AppCanvas
