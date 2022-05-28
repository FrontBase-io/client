const ListHeader: React.FC<{ children: JSX.Element | string }> = ({
  children,
}) => {
  // Vars

  // Lifecycle

  // UI
  return <li style={{ cursor: 'default', fontSize: '.95rem' }}>{children}</li>
}

export default ListHeader
