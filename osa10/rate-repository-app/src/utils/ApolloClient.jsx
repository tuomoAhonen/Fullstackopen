import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {relayStylePagination} from '@apollo/client/utilities';
import Constants from 'expo-constants';
//console.log(Constants.expoConfig.extra.apolloUri);

const httpLink = createHttpLink({
	uri: Constants.expoConfig.extra.apolloUri,
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				repositories: relayStylePagination(),
			},
		},
		Repository: {
			fields: {
				reviews: relayStylePagination(),
			},
		},
		User: {
			//keyFields: ['id', 'username', 'reviews'],
			fields: {
				reviews: relayStylePagination(),
			},
		},
		/*ReviewConnection: {
			fields: {
				edges: {
					keyArgs: false,
					// Concatenate the incoming list items with
					// the existing list items.
					merge(existing = existing ? existing : [], incoming) {
						//console.log('existing: ', existing);
						//console.log('incoming: ', incoming);
						return [...existing, ...incoming];
					},
				},
			},
		},*/
		/*Review: {
			fields: {
				repository: {
					keyArgs: false,
					// Concatenate the incoming list items with
					// the existing list items.
					merge(existing = existing ? existing : [], incoming) {
						console.log('existing: ', existing);
						console.log('incoming: ', incoming);
						return [...incoming];
					},
				},
			},
			// Don't cache separate results based on
			// any of this field's arguments.
		},*/
	},
});

const createApolloClient = (authStorage) => {
	const authLink = setContext(async (_, {headers}) => {
		try {
			const accessToken = await authStorage.getAccessToken();
			return {
				headers: {
					...headers,
					authorization: accessToken ? accessToken : '',
				},
			};
		} catch (error) {
			console.log(error);
			return {
				headers,
			};
		}
	});

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: cache,
		//cache: new InMemoryCache(),
		defaultOptions: {
			fetchPolicy: 'cache-and-network',
		},
	});
};

export default createApolloClient;
