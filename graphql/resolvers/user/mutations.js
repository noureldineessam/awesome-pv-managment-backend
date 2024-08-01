import { userService } from '../../../app.js';

const userMutations = {
    createUser: async (_, { user }) => {
        const newUser = await userService.saveUser(user);

        return newUser;
    },
    updateUser: async (_, { _id, user }) => {
        const updatedUser = await userService.updateUser(_id, user);

        return updatedUser;
    },
    deleteUser: async (_, { _id }) => {
        const deletedUser = await userService.deleteUser(_id);

        return deletedUser;
    },
    loginUser: async (_, { email, password }) => {
        const loginUser = await userService.loginUser(email, password);
        return loginUser;
    }
};

export default userMutations;