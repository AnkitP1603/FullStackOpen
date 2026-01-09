import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const { message, type } = notification

  if (!message) {
    return null
  }

  const style = {
    backgroundColor: 'lightgrey',
    margin: '10px',
    padding: '10px',
    border: '2px solid',
    borderColor: type === 'success' ? 'green' : 'red',
    borderRadius: '5px',
  }

  return <div style={style}>{message}</div>
}

export default Notification
