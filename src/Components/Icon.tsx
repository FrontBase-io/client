const Icon: React.FC<{ icon: string; style?: React.CSSProperties }> = ({
  icon,
  style,
}) => <i className={`mdi mdi-${icon}`} style={style} />

export default Icon
