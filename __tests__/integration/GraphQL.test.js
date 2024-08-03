import {
    executeOperation,
    setupServer,
    createUserAndAuthenticate,
    cleanup,
    globalUser,
    token,
    createFacility,
    globalFacility
} from '../graphql-utils/setup-utils.js';

import {
    GET_USER_QUERY,
    GET_FACILITY_QUERY,
    USER_FACILITIES_QUERY,
} from '../graphql-utils/queries.js';

import {
    UPDATE_USER_MUTATION,
    UPDATE_FACILITY_MUTATION,
} from '../graphql-utils/mutations.js';

import mongoose from 'mongoose';

let nonExistentUserId = new mongoose.Types.ObjectId().toString();
let nonExistentFacilityId = new mongoose.Types.ObjectId().toString();


describe('User and Facility Queries and Mutations', () => {
    let server;

    beforeAll(async () => {
        server = await setupServer();

        const { userResponse, tokenResponse } = await createUserAndAuthenticate();
        if (!userResponse || !tokenResponse) {
            throw new Error('User authentication failed: userResponse or tokenResponse is undefined');
        }

        const facilityResponse = await createFacility();
        if (!facilityResponse) {
            throw new Error('Facility creation failed: response is undefined');
        }
    });

    afterAll(async () => {
        const { isUserDeleted, isFacilityDeleted } = await cleanup();
        expect(isUserDeleted).toBeDefined();
        expect(isFacilityDeleted).toBeDefined();

        if (server) {
            await server.close();
        }
    });

    describe('User Queries and Mutations', () => {
        it('should fetch a user by ID', async () => {
            const variables = { _id: globalUser._id };
            const response = await executeOperation({ query: GET_USER_QUERY, variables });
            expect(response.data).toEqual({
                user: {
                    _id: globalUser._id,
                    name: globalUser.name,
                    email: globalUser.email,
                },
            });
        });

        it('should return an error when fetching a non-existent user by ID', async () => {
            const variables = { _id: nonExistentUserId };
            const response = await executeOperation({ query: GET_USER_QUERY, variables });
            expect(response.errors[0].message).toBe('User not found');
        });

        it('should update an existing user', async () => {
            const updatedUser = { name: "Updated Name" };
            const variables = { _id: globalUser._id, user: updatedUser };

            const response = await executeOperation({ query: UPDATE_USER_MUTATION, variables });

            expect(response.data.updateUser).toMatchObject({
                _id: globalUser._id,
                name: updatedUser.name,
            });
        });

        it('should return an error when updating a non-existent user', async () => {
            const updatedUser = { name: "Updated Name" };
            const variables = { _id: nonExistentUserId, user: updatedUser };

            const response = await executeOperation({ query: UPDATE_USER_MUTATION, variables });

            expect(response.errors[0].message).toBe('User not found');
        });
    });

    describe('Facility Queries and Mutations', () => {
        it('should fetch a facility by ID', async () => {
            const variables = { _id: globalFacility._id };
            const response = await executeOperation({ query: GET_FACILITY_QUERY, variables });
            expect(response.data).toMatchObject({
                facility: {
                    _id: globalFacility._id,
                    name: globalFacility.name,
                },
            });
        });

        it('should return an error when fetching a non-existent facility by ID', async () => {
            const variables = { _id: nonExistentFacilityId };
            const response = await executeOperation({ query: GET_FACILITY_QUERY, variables });
            expect(response.errors[0].message).toBe('Facility not found');
        });

        it('should list all facilities for a user', async () => {
            const response = await executeOperation({ query: USER_FACILITIES_QUERY });
            expect(response.data.userFacilities).toBeInstanceOf(Array);
            // Validate the array content as needed
            expect(response.data.userFacilities).toContainEqual({
                _id: globalFacility._id,
                name: globalFacility.name,
            });
        });


        it('should update a facility', async () => {
            const updatedData = { nominialPower: 1 };
            const variables = { _id: globalFacility._id, facility: updatedData };
            const response = await executeOperation({ query: UPDATE_FACILITY_MUTATION, variables });
            expect(response.data.updateFacility).toMatchObject({
                _id: globalFacility._id,
                nominialPower: updatedData.nominialPower,
            });
        });

        it('should return an error when updating a non-existent facility', async () => {
            const updatedData = { nominialPower: 1 };
            const variables = { _id: nonExistentFacilityId, facility: updatedData };
            const response = await executeOperation({ query: UPDATE_FACILITY_MUTATION, variables });
            expect(response.errors[0].message).toBe('Facility not found');
        });

    });
});
