const Notification = ({ message, type }) => {
  const errorStyle = {
    color : 'red',
    background : 'lightgrey',
    fontSize : 20,
    borderStyle : 'solid',
    borderRadius : 5,
    padding : 10,
    marginBottom : 10
  }

  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderSadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={type==='error' ? errorStyle : notifStyle} className="notification">
      {message}
    </div>
  )
}

export default Notification