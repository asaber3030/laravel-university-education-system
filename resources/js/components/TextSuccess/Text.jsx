const Text = ({ children, type = 'success' }) => {
  return (
    <>
      {type === 'success' && (
        <span className="text-success">{children}</span>
      )}
      {type === 'warning' && (
        <span className="text-warning">{children}</span>
      )}
      {type === 'danger' && (
        <span className="text-danger">{children}</span>
      )}
      {type === 'secondary' && (
        <span className="text-secondary">{children}</span>
      )}
    </>
  )
}

export default Text
