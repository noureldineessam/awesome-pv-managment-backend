import apolloServer from '../../graphql/index.js';
import authVerify from '../../middlewares/authVerify.js';
import { app, run } from '../../app.js';
import {
    CREATE_USER_MUTATION,
    DELETE_USER_MUTATION,
    LOGIN_USER_MUTATION,
    CREATE_FACILITY_MUTATION,
    DELETE_FACILITY_MUTATION
} from './mutations.js';

const appPort = 3002;
let server;

export const globalUser = {
    email: "test@test.com",
    name: "test",
    password: "test",
};

export const globalFacility = {
    name: "Test Facility",
};

let token = null;

export async function executeOperation({ query, variables }) {
    try {
        return await apolloServer.executeOperation(
            { query, variables },
            {
                req: {
                    headers: {
                        authorization: token ? `Bearer ${token}` : null,
                    },
                    user: token ? { ...globalUser } : null,
                },
            }
        );
    } catch (error) {
        console.error('Error executing operation:', error);
        throw error;
    }
}

export async function setupServer() {
    await run(app);
    app.use(authVerify);
    server = app.listen(appPort);
}

export async function createUserAndAuthenticate() {
    const variables = { user: globalUser };
    const userResponse = await executeOperation({ query: CREATE_USER_MUTATION, variables });
    globalUser._id = userResponse.data.createUser._id;

    const tokenResponse = await executeOperation({
        query: LOGIN_USER_MUTATION,
        variables: { email: globalUser.email, password: globalUser.password }
    });
    token = tokenResponse.data.loginUser.token;

    return { userResponse, tokenResponse };
}

export async function cleanup() {
    if (server) {
        let isUserDeleted = false
        let isFacilityDeleted = false
        if (globalUser._id) {
            isUserDeleted = await executeOperation({
                query: DELETE_USER_MUTATION,
                variables: { _id: globalUser._id },
                token
            });
        }
        if (globalFacility._id) {
            isFacilityDeleted = await executeOperation({
                query: DELETE_FACILITY_MUTATION,
                variables: { _id: globalFacility._id },
                token
            });
        }

        await new Promise(resolve => server.close(resolve));

        return { isUserDeleted, isFacilityDeleted };
    }
}

export async function createFacility() {
    const variables = { facility: globalFacility };
    const response = await executeOperation({ query: CREATE_FACILITY_MUTATION, variables });
    globalFacility._id = response.data.createFacility._id;

    return response;
}
