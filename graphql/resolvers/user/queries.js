
import { userService } from '../../../app.js';

import { UserNotFoundError, AuthenticationError, UserInputError } from '../../../errors/Errors.js';


const userQueries = {
    user: async (_, { _id }, context) => {
        try {
            if (!context.user) throw new AuthenticationError('Unauthorized');
            return await userService.getUserById(_id);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                throw new UserInputError(error.message);
            }
            throw new Error('Internal server error');
        }
    },
};


export default userQueries;