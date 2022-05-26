import { Ripple } from 'primereact/ripple'

const Icon: React.FC<{
  icon: string
  style?: React.CSSProperties
  withRipple?: true
}> = ({ icon, style, withRipple }) => (
  <i
    className={`mdi mdi-${icon} ${withRipple ? 'p-ripple' : ''}`}
    style={style}
  >
    {withRipple && <Ripple />}
  </i>
)

export default Icon
