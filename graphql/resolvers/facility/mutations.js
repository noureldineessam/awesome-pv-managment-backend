import { facilityService } from '../../../app.js';

const facilityMutations = {
    createFacility: async (_, { facility }, { user }) => {
        const newFacility = await facilityService.saveUserFacility(facility, user.id);
        return newFacility;
    },
    deleteFacility: async (_, { _id }, { user }) => {
        const deletedFacility = await facilityService.deleteUserFacility(_id, user.id);
        return deletedFacility;
    },
    updateFacility: async (_, { _id, facility }, { user }) => {
        const updatedFacility = await facilityService.updateUserFacility(_id, facility, user.id);
        return updatedFacility;
    }
};

export default facilityMutations;
