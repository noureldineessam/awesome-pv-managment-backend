import {
    userQueries,
    userMutations,
} from './user/index.js';

import {
    reportQueries,
    reportMutations,
} from './report/index.js';

import {
    facilityQueries,
    facilityMutations,
} from './facility/index.js';


const resolvers = {
    Query: {
        ...userQueries,
        ...reportQueries,
        ...facilityQueries
    },
    Mutation: {
        ...userMutations,
        ...reportMutations,
        ...facilityMutations
    },
};

export default resolvers;