const styles: React.CSSProperties = {
	display: 'block',
	position: 'absolute',
	top: 0,
	right: '5px',
	backgroundColor: '#ffffff',
	padding: '5px',
};

const ErrorMessage = ({errorMessage}: {errorMessage: string | undefined}): null | React.ReactElement => {
	if (errorMessage) {
		return <div style={styles}>Error message</div>;
	}

	return null;
};

export default ErrorMessage;
