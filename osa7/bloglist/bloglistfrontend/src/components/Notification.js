import {useNotificationValue} from '../reducers/NotificationReducer';

const Notification = () => {
	//console.log('käytiin Notification.js:sä');
	const notification = useNotificationValue();

	//console.log(notification);

	const notificationStyle = {
		display: 'block',
		width: '320px',
		position: 'absolute',
		right: '10px',
		top: '10px',
		padding: '5px',
		backgroundColor: notification.type === null ? '#F0F8FF' : notification.type === 'success' ? '#9ACD32' : '#E9967A',
	};

	if (notification.message === null) {
		return null;
	} else {
		return <div style={notificationStyle}>{notification.message}</div>;
	}
};

export default Notification;
