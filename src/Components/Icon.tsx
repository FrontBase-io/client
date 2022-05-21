const Icon: React.FC<{ icon: string; style?: React.CSSProperties }> = ({
  icon,
  style,
}) => <i className={`pi pi-${icon}`} style={style} />

export default Icon
