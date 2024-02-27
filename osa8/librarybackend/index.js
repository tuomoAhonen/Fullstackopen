const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

const {GraphQLError} = require('graphql');
const {verifyToken} = require('./services/tokenService');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const {WebSocketServer} = require('ws');
const {useServer} = require('graphql-ws/lib/use/ws');

const startServer = async () => {
	const app = express();
	const httpServer = http.createServer(app);

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/',
	});

	const schema = makeExecutableSchema({typeDefs: typeDefs, resolvers: resolvers});
	const serverCleanup = useServer({schema}, wsServer);

	const server = new ApolloServer({
		schema: schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({httpServer: httpServer}),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						},
					};
				},
			},
		],
	});

	await server.start();

	app.use(
		'/',
		cors(),
		bodyParser.json(),
		expressMiddleware(server, {
			context: async ({req}) => {
				const auth = req ? req.headers.auth : null;
				//console.log(auth);

				if (auth && typeof auth === 'string' && auth.length > 0 && auth !== null && auth !== 'null' && auth !== 'undefined') {
					const token = verifyToken(auth);
					//console.log(token);

					if (token && typeof token === 'object' && Object.keys(token).length > 0) {
						return {auth: auth, user: token.data};
					} else {
						throw new GraphQLError(`Authorization expired or wrong token. Please re-login`);
					}
				}

				return null;
			},
		})
	);

	httpServer.listen(3002, () => console.log(`Apollo Express server is now running @ http://localhost:3002`));
};

startServer();
