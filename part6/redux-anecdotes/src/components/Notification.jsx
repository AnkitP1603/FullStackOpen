import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  const notification = useSelector((state) => state.notification);

  return <div>{notification && <div style={style}>{notification}</div>}</div>;
};

export default Notification;
