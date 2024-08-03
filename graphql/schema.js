import path from 'path';
import fs from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers/index.js';

const __dirname = path.resolve();
const gqlFiles = fs.readdirSync(path.join(__dirname, './graphql/typedefs'));

let typeDefs = '';

gqlFiles.forEach((file) => {
    typeDefs += fs.readFileSync(path.join(__dirname, './graphql/typedefs', file), {
        encoding: 'utf8',
    });
});

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;
