const ErrorHandler = (error) => {
	console.log(error);
	return error.message;
};

export default ErrorHandler;
