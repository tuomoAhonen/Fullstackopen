import {useApolloClient, useMutation} from '@apollo/client';
import {signInMutation} from '../graphql/Mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
	const [mutate, result] = useMutation(signInMutation, {
		//onError: (error) => console.log(error),
		//onCompleted: (data) => console.log(data),
		/*nothing here yet */
	});
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const signIn = async ({username, password}) => {
		try {
			const {data} = await mutate({variables: {username, password}});
			console.log(data);
			await authStorage.setAccessToken(data.authenticate.accessToken);
			await apolloClient.resetStore();
			return data;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	return [signIn, result];
};

export default useSignIn;
