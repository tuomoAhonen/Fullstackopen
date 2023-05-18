import {useSelector} from "react-redux";
//import {useDispatch} from "react-redux";
//import {unsetNotification} from "../reducers/NotificationReducer";

const Notification = () => {
  const notification = useSelector(state => {
    //console.log(state.notification);
    if (state.notification.content === null) {
      return null;
    } else {
      if (state.notification.content.type === 'vote') {
        //console.log(state.notification.content);
        return `Voted "${state.notification.content.anecdote}"`;
      } else {
        //console.log(state.notification.content.anecdote);
        return `Added "${state.notification.content.anecdote}"`;
      }
    }
  });

  //const dispatch = useDispatch();

  let style = {
    display: 'none',
    position: 'absolute',
    right: '10px',
    top: '10px',
    marginTop: '10px',
    padding: '2px',
    fontSize: '16px',
    backgroundColor: '#90EE90',
  };

  if (notification) {
    //console.log('inside if');
    style.display = 'block';
    //style = {...style, display: 'block'};
    /*
    setTimeout(() => {
      dispatch(unsetNotification());
    }, 5000)
    */
  } else {
    return null;
  }

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;