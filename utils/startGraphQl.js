import graphqlServer from '../graphql/index.js';


async function startGraphQl(app) {
    await graphqlServer.start();
    graphqlServer.applyMiddleware({ app });
}

export default startGraphQl;