
import { facilityService } from '../../../app.js';

const facilityQueries = {
    facility: async (_, { _id }, { user }) => {
        try {
            const facility = await facilityService.getUserFacilityById(_id, user.id);
            return facility || null;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Error fetching user');
        }
    },
    userFacilities: async (_, __, { user }) => {
        try {
            const facilities = await facilityService.getAllUserFacilities(user.id);
            return facilities || null;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Error fetching user');
        }
    },
};


export default facilityQueries;