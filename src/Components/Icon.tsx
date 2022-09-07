import { CSSProperties } from 'react'

const Icon: React.FC<{
  icon?: string
  size?: number
  style?: CSSProperties
}> = ({ icon, size, style }) =>
  icon ? (
    <span
      style={{ ...(style ?? {}), fontSize: size ?? 18 }}
      className={`mdi mdi-${icon}`}
    ></span>
  ) : (
    <></>
  )

export default Icon
