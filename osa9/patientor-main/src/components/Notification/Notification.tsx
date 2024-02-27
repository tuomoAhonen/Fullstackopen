import {useEffect, useState} from 'react';
import {useClearMessageDispatch} from '../../reducers/MessageReducer';

//let timer: any;
const Notification = ({message}: {message: {value: string; type: any} | null}) => {
	const [timer, setTimer] = useState<any>(undefined);
	const [timerOn, setTimerON] = useState<boolean>(false);
	const clearMessage = useClearMessageDispatch();

	useEffect(() => {
		//console.log(timer);
		if (timerOn && timer) {
			clearTimeout(timer);
			//setTimer(undefined);
		}

		setTimerON(true);
		setTimer(
			/*timer = */
			setTimeout(() => {
				clearMessage();
				setTimerON(false);
				setTimer(undefined);
			}, 5000)
		);

		// eslint-disable-next-line
	}, [message]);

	if (!message || message === null) {
		return null;
	}

	return (
		<div
			style={{
				display: `block`,
				zIndex: 2,
				position: `fixed`,
				top: 0,
				right: 0,
				padding: `5px`,
				backgroundColor: message.type === `success` ? `#ADFF2F` : message.type === `error` ? `#FFB6C1` : `#ffffff`,
			}}
		>
			{message.value}
		</div>
	);
};

export default Notification;
