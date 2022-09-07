
const Icon: React.FC<{icon: string, size?: number}> = ({icon, size}) => <span className={`mdi mdi-${icon}`} style={{fontSize: size ?? 18}}></span>;

export default Icon;