import { logger } from '../utils/logger.js';
import { FacilityNotFoundError, InvalidCredentialsError, UserNotFoundError, FacilityAlreadyExistsError } from '../errors/Errors.js';

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
            logger.error('Error fetching facilities', { error });
            throw new Error('Failed to fetch facilities');
        }
    }

    async getUserFacilityById(_id, userId) {
        try {
            logger.info('Fetching facility by ID', { _id });
            const user = await this.userRepository.findById(userId);
            if (!user) throw new UserNotFoundError('User not found');

            let userFacilities = user.facilities.map(facility => facility.toString());
            if (!userFacilities.includes(_id)) throw new FacilityNotFoundError('Facility not found');

            const facility = await this.facilityRepository.findById(_id);
            if (!facility) throw new FacilityNotFoundError('Facility not found');

            return facility;
        } catch (error) {
            logger.error('Error retrieving facility by ID', { error });
            throw error;
        }
    }

    async saveUserFacility(facilityData, userId) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) throw new UserNotFoundError('User not found');

            const existingFacility = await this.facilityRepository.findById(facilityData._id);
            if (existingFacility) throw new FacilityAlreadyExistsError('Facility already exists');

            const facility = {
                ...facilityData,
                userId,
            };

            const savedFacility = await this.facilityRepository.save(facility);
            user.facilities.push(savedFacility._id);
            await user.save();

            return savedFacility;
        } catch (error) {
            logger.error('Error creating facility', { error });
            throw error;
        }
    }

    async updateUserFacility(_id, facilityData, userId) {
        try {
            const facility = await this.facilityRepository.findById(_id);
            if (!facility) throw new FacilityNotFoundError('Facility not found');
            if (facility.userId.toString() !== userId.toString()) throw new InvalidCredentialsError('Unauthorized');

            const updatedFacility = await this.facilityRepository.update(_id, facilityData);
            return updatedFacility;
        } catch (error) {
            logger.error('Error updating facility', { error });
            throw error;
        }
    }

    async deleteUserFacility(_id, userId) {
        try {
            const facility = await this.facilityRepository.findById(_id);
            if (!facility) throw new FacilityNotFoundError('Facility not found');
            if (facility.userId.toString() !== userId.toString()) throw new InvalidCredentialsError('Unauthorized');

            await this.facilityRepository.delete(_id);
            return true;
        } catch (error) {
            logger.error('Error deleting facility', { error });
            throw error;
        }
    }
}
