import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    height: "1.5em",
  };
  return <div style={style}>Notification: {notification}</div>;
};

export default Notification;
