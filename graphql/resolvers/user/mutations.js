import { userService } from '../../../app.js';

import { UserNotFoundError, UserAlreadyExistsError, InvalidCredentialsError, AuthenticationError, UserInputError } from '../../../errors/Errors.js';

const userMutations = {
    createUser: async (_, { user }, context) => {
        try {
            return await userService.saveUser(user);
        } catch (error) {
            if (error instanceof UserAlreadyExistsError) {
                throw new UserInputError(error.message);
            }
            throw new Error('Failed to create user');
        }
    },
    deleteUser: async (_, { _id }, context) => {
        try {
            if (!context.user) throw new AuthenticationError('Unauthorized');
            return await userService.deleteUser(_id);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                throw new UserInputError(error.message);
            }
            throw new Error('Failed to delete user');
        }
    },
    updateUser: async (_, { _id, user }, context) => {
        try {
            if (!context.user) throw new AuthenticationError('Unauthorized');
            return await userService.updateUser(_id, user);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                throw new UserInputError(error.message);
            }
            throw new Error('Failed to update user');
        }
    },
    loginUser: async (_, { email, password }) => {
        try {
            return await userService.loginUser(email, password);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                throw new UserInputError(error.message);
            }
            throw new Error('Login failed');
        }
    },
};

export default userMutations;