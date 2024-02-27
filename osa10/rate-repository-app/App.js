import {NativeRouter} from 'react-router-native';
import {StatusBar} from 'expo-status-bar';
import {ApolloProvider} from '@apollo/client';
import Main from './src/components/Main';
import createApolloClient from './src/utils/ApolloClient';
import AuthStorage from './src/utils/AuthStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const App = () => {
	const authStorage = new AuthStorage();
	const apolloClient = createApolloClient(authStorage);
	return (
		<>
			<NativeRouter>
				<ApolloProvider client={apolloClient}>
					<AuthStorageContext.Provider value={authStorage}>
						<Main />
					</AuthStorageContext.Provider>
				</ApolloProvider>
			</NativeRouter>
			<StatusBar style='auto' />
		</>
	);
};

export default App;

