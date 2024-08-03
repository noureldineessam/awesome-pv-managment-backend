import { facilityService } from '../../../app.js';

import { FacilityNotFoundError, InvalidCredentialsError, UserNotFoundError, FacilityAlreadyExistsError, AuthenticationError, UserInputError } from '../../../errors/Errors.js';

const facilityMutations = {
    createFacility: async (_, { facility }, { user }) => {
        try {
            if (!user) throw new AuthenticationError('Unauthorized');
            return await facilityService.saveUserFacility(facility, user._id);
        } catch (error) {
            if (error instanceof FacilityAlreadyExistsError || error instanceof UserNotFoundError) {
                throw new UserInputError(error.message);
            }
            throw new Error('Failed to create facility');
        }
    },
    deleteFacility: async (_, { _id }, { user }) => {
        try {
            if (!user) throw new AuthenticationError('Unauthorized');
            return await facilityService.deleteUserFacility(_id, user._id);
        } catch (error) {
            if (error instanceof FacilityNotFoundError || error instanceof InvalidCredentialsError) {
                throw new UserInputError(error.message);
            }
            throw new Error('Failed to delete facility');
        }
    },
    updateFacility: async (_, { _id, facility }, { user }) => {
        try {
            if (!user) throw new AuthenticationError('Unauthorized');
            return await facilityService.updateUserFacility(_id, facility, user._id);
        } catch (error) {
            if (error instanceof FacilityNotFoundError || error instanceof InvalidCredentialsError) {
                throw new UserInputError(error.message);
            }
            throw new Error('Failed to update facility');
        }
    },
};

export default facilityMutations;
