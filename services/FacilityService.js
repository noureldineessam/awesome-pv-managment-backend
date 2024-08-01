import { logger } from '../utils/logger.js';

export class FacilityService {
    constructor({ reportRepository, userRepository, facilityRepository }) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
        this.facilityRepository = facilityRepository;
    }

    async getAllUserFacilities(userId) {
        try {
            logger.info('Fetching all facilities by user', { userId });
            return await this.facilityRepository.findAllByUserId(userId);
        } catch (error) {
            logger.error('Error fetching facilities', { message: error.message, stack: error.stack });
            throw new Error('Failed to fetch facilities');
        }
    }

    async getUserFacilityById(_id, userId) {
        try {
            logger.info('Fetching facility by ID', { _id });
            const user = await this.userRepository.findById(userId);
            if (!user || !user.facilities.includes(_id)) throw new Error('Unauthorized');

            const facility = await this.facilityRepository.findById(_id);
            return facility ? facility : null;
        } catch (error) {
            logger.error('Error retrieving facility by ID', { message: error.message, stack: error.stack });
            throw new Error(`Failed to retrieve facility: ${error.message}`);
        }
    }

    async saveUserFacility(facilityData, userId) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) throw new Error('User not found');

            // Set userId and save the facility
            const facility = {
                ...facilityData,
                userId,
            };

            const savedFacility = await this.facilityRepository.save(facility);

            //TODO: simpilify
            if (!user.facilities) {
                user.facilities = [];
            }
            user.facilities.push(savedFacility._id);
            await user.save();

            return savedFacility;
        } catch (error) {
            logger.error('Error creating Facility', error);
            throw new Error('Failed to create Facility');
        }
    }

    async updateUserFacility(_id, facilityData, userId) {
        try {
            const facility = await this.facilityRepository.findById(_id);
            if (!facility) throw new Error('Facility not found');
            if (facility.userId.toString() !== userId.toString()) throw new Error('Unauthorized');

            const updatedFacility = await this.facilityRepository.update(_id, facilityData);
            return updatedFacility;
        } catch (error) {
            logger.error('Error updating facility', error);
            throw new Error('Failed to update facility');
        }
    }

    async deleteUserFacility(_id, userId) {
        try {
            const facility = await this.facilityRepository.findById(_id);
            if (!facility) throw new Error('Facility not found');
            if (facility.userId.toString() !== userId.toString()) throw new Error('Unauthorized');

            await this.facilityRepository.delete(_id);
            return true;
        } catch (error) {
            logger.error('Error deleting facility', error);
            throw new Error('Failed to delete facility');
        }
    }
}
