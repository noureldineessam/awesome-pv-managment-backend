import { ApolloServer } from 'apollo-server-express';
import { env } from '../config/environment.js';
import schema from './schema.mjs';

const apolloServer = new ApolloServer({
    schema,
    playground: env.development,
    context: ({ req }) => ({
        user: req.user,
    }),
});

export default apolloServer;