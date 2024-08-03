// resolvers/queries/facilityQueries.js
import { facilityService } from '../../../app.js';

import { FacilityNotFoundError, InvalidCredentialsError, UserNotFoundError, AuthenticationError, UserInputError } from '../../../errors/Errors.js';

const facilityQueries = {
    facility: async (_, { _id }, { user }) => {
        try {
            if (!user) throw new AuthenticationError('Unauthorized');
            return await facilityService.getUserFacilityById(_id, user._id);
        } catch (error) {
            if (error instanceof FacilityNotFoundError || error instanceof InvalidCredentialsError) {
                throw new UserInputError(error.message);
            }
            throw new Error('Internal server error');
        }
    },
    userFacilities: async (_, __, { user }) => {
        try {
            if (!user) throw new AuthenticationError('Unauthorized');
            return await facilityService.getAllUserFacilities(user._id);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                throw new UserInputError(error.message);
            }
            throw new Error('Internal server error');
        }
    },
};

export default facilityQueries;
