import {useReducer, createContext, useContext} from "react";

const notificationReducer = (state, action) => {
  //console.log('Notification reducer: ');
  //console.log('state: ', state);
  //console.log('action: ', action);
  switch (action.type) {
    case 'error':
      return action.payload;
    case 'success':
      return action.payload;
    case 'null':
      return null;
    default:
      console.log('Default state. No action type on notfication');
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export default NotificationContext;