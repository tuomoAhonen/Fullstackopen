import {useNotificationValue/*, useNotificationDispatch*/} from "../reducers/NotificationReducer";

const Notification = () => {
  let message = useNotificationValue();

  const style = {
    display: 'block',
    position: 'absolute',
    right: '10px',
    top: '10px',
    padding: '5px',
    marginBottom: '5px',
    backgroundColor: '#ffffff'
  };

  //message = null;

  if (message === null) { 
    return null; 
  } else {
    return (
      <div style={style}>
        {message}
      </div>
    );
  }
};

export default Notification;