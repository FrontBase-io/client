import { CSSProperties } from 'react'
export interface IconProps {
  icon?: string
  size?: number
  style?: CSSProperties
}
const Icon: React.FC<IconProps> = ({ icon, size, style }) =>
  icon ? (
    <span
      style={{ ...(style ?? {}), fontSize: size ?? 18 }}
      className={`mdi mdi-${icon}`}
    ></span>
  ) : (
    <></>
  )

export default Icon
