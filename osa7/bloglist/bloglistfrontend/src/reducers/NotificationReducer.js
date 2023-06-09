import {useReducer, createContext, useContext} from 'react';

const notificationReducer = (state, action) => {
	//console.log(state);
	//console.log(action);
	switch (action.type) {
		case 'success':
			//console.log('success kohta');
			return {message: action.payload, type: action.type};
		case 'error':
			//console.log('error kohta');
			return {message: action.payload, type: action.type};
		case null:
			//console.log('null kohta');
			//return null;
			return {message: null, type: null};
		default:
			//console.log('default kohta');
			return state;
	}
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, {message: null, type: null});
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

/* Voidaan ottaa käyttöön vain, jos näille keksisi miten voidaan käyttää ilman/ulkopuolella Reactin Componenttia
export const useDispatchMessage = (message) => {
	const dispatch = useNotificationDispatch();
	dispatch({payload: message, type: 'success'});
	setTimeout(() => {
		return dispatch({type: null});
	}, 5000);
};

export const useDispatchErrorMessage = (message) => {
	const dispatch = useNotificationDispatch();
	dispatch({payload: message, type: 'error'});
	setTimeout(() => {
		return dispatch({type: null});
	}, 5000);
};
*/
