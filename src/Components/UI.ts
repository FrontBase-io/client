import Card from './Card'
import Icon from './Icon'
import ModelOverview from './Model/Overview'
import ObjectLayout from './Model/ObjectLayout'
import ListDetailLayout from './ListDetailLayout/ListDetailLayout'

const Model = { Overview: ModelOverview, Object: ObjectLayout }

export default { Card, Icon, Model, Layouts: { ListDetailLayout } }
