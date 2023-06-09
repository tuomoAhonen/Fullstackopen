import {getBlogs} from '../services/BlogService';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Navigation from './Navigation';

const DisplayApp = ({userCredentials, setUser, handleMessage}) => {
	const queryClient = useQueryClient();
	const {isLoading, isError, error, data} = useQuery({queryKey: ['blogs'], queryFn: getBlogs});

	const refreshBlogs = () => {
		queryClient.invalidateQueries({queryKey: ['blogs']});
	};

	const handleLogout = (wait) => {
		if (wait) {
			setTimeout(() => {
				return handleLogout();
			}, 2500);
		} else {
			window.localStorage.clear();
			setUser({type: null});

			window.location.replace('http://localhost:3000/');
			return handleMessage('Logout successful', 'success');
		}
	};

	const handleErrors = (error) => {
		//console.log(error);
		if (error.response.data === 'Error: jwt expired') {
			handleMessage(`${error.response.data}. User credentials expired... please login`, 'error');
			return handleLogout('wait');
		} else if (error.response.data === 'Error: Token invalid or missing, jwt must be provided') {
			handleMessage(`${error.response.data}. User credentials expired... please login`, 'error');
			return handleLogout('wait');
		} else if (error.response.data) {
			return handleMessage(error.response.data, 'error');
		} else {
			return handleMessage(error.message, 'error');
		}
	};

	if (isLoading) {
		return <div>Loading... Hold your horses</div>;
	}

	if (isError) {
		return <div>{error.message}</div>;
	}

	return (
		<Navigation
			userCredentials={userCredentials}
			blogs={data}
			refreshBlogs={refreshBlogs}
			setUser={setUser}
			handleLogout={handleLogout}
			handleMessage={handleMessage}
			handleErrors={handleErrors}
		/>
	);
};

export default DisplayApp;
