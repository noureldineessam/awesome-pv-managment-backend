
import { userService } from '../../../app.js';

const userQueries = {
    user: async (_, { _id }) => {
        try {
            const user = await userService.getUserById(_id);
            return user || null;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Error fetching user');
        }
    }
};


export default userQueries;