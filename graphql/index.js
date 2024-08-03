import { ApolloServer } from 'apollo-server-express';
import { env } from '../config/environment.js';
import schema from './schema.js';

const apolloServer = new ApolloServer({
    schema,
    playground: env.development,
    context: ({ req = {} }) => ({
        user: req.user || null,
    }),
});

export default apolloServer;