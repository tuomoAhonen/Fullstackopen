import {useNotificationValue/*, useNotificationDispatch*/} from "../reducers/NotificationReducer";

const Notification = () => {
  let message = useNotificationValue();

  const style = {
    padding: '5px',
    marginBottom: '5px',
    backgroundColor: '#ffffff',
    display: 'block',
    position: 'absolute',
    right: '10px',
    top: '10px'
  }

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