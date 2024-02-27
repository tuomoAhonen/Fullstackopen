import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createHttpLink, ApolloClient, InMemoryCache, ApolloProvider, split} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {setContext} from '@apollo/client/link/context';

const authLink = setContext((_, {headers}) => {
	const token = localStorage.getItem('jwt');
	return {
		headers: {
			...headers,
			auth: token ? token : null,
		},
	};
});

const httpLink = createHttpLink({
	uri: 'http://localhost:3002',
});

const wsLink = new GraphQLWsLink(createClient({url: 'ws://localhost:3002'}));

const splitLink = split(
	({query}) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	authLink.concat(httpLink)
);

const client = new ApolloClient({
	//uri: 'http://localhost:3002',
	cache: new InMemoryCache(),
	link: splitLink,
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);

