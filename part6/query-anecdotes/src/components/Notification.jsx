import NotificationContext from "../notificationContext"
import { useContext } from "react"

const Notification = () => {
  const { notification } = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return <div>
    {notification && <div style={style}>
      {notification}
    </div>}
  </div>
}

export default Notification
