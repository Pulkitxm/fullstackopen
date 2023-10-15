const Notification = ({message}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    minHeight:"1.2em"
  }
  
  if (message=='') return <div style={style}></div>

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
