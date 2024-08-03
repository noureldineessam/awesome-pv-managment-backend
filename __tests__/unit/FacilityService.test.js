import { FacilityService } from '../../services/FacilityService.js';
import { FacilityNotFoundError, InvalidCredentialsError, UserNotFoundError, FacilityAlreadyExistsError } from '../../errors/Errors.js';

const mockFacilityRepository = {
    findAllByUserId: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const mockUserRepository = {
    findById: jest.fn(),
};

const facilityService = new FacilityService({
    reportRepository: {},
    userRepository: mockUserRepository,
    facilityRepository: mockFacilityRepository,
});

describe('FacilityService', () => {
    describe('getAllUserFacilities', () => {
        it('should return facilities if found', async () => {
            const mockFacilities = [{ _id: '1', name: 'Facility 1' }];
            mockFacilityRepository.findAllByUserId.mockResolvedValue(mockFacilities);
            const facilities = await facilityService.getAllUserFacilities('userId');
            expect(facilities).toEqual(mockFacilities);
        });

        it('should throw an error if fetching facilities fails', async () => {
            mockFacilityRepository.findAllByUserId.mockRejectedValue(new Error('Failed to fetch facilities'));
            await expect(facilityService.getAllUserFacilities('userId'))
                .rejects.toThrowError(new Error('Failed to fetch facilities'));
        });
    });

    describe('getUserFacilityById', () => {
        it('should return facility if found', async () => {
            const mockUser = { _id: 'userId', facilities: ['1'] };
            const mockFacility = { _id: '1', name: 'Facility 1' };
            mockUserRepository.findById.mockResolvedValue(mockUser);
            mockFacilityRepository.findById.mockResolvedValue(mockFacility);
            const facility = await facilityService.getUserFacilityById('1', 'userId');
            expect(facility).toEqual(mockFacility);
        });

        it('should throw FacilityNotFoundError if facility not found', async () => {
            const mockUser = { _id: 'userId', facilities: [] };
            mockUserRepository.findById.mockResolvedValue(mockUser);
            mockFacilityRepository.findById.mockResolvedValue(null);
            await expect(facilityService.getUserFacilityById('1', 'userId'))
                .rejects.toThrowError(new FacilityNotFoundError('Facility not found'));
        });

        it('should throw FacilityNotFoundError if user does not have the facility', async () => {
            const mockUser = { _id: 'userId', facilities: ['2'] };
            mockUserRepository.findById.mockResolvedValue(mockUser);
            await expect(facilityService.getUserFacilityById('1', 'userId'))
                .rejects.toThrowError(new FacilityNotFoundError('Facility not found'));
        });
    });

    describe('saveUserFacility', () => {
        it('should save and return facility if user exists', async () => {
            const mockUser = { _id: 'userId', facilities: [], save: jest.fn() };
            const newFacility = { _id: '1', name: 'New Facility' };
            mockUserRepository.findById.mockResolvedValue(mockUser);
            mockFacilityRepository.save.mockResolvedValue(newFacility);
            const savedFacility = await facilityService.saveUserFacility(newFacility, 'userId');
            expect(savedFacility).toEqual(newFacility);
        });

        it('should throw UserNotFoundError if user not found', async () => {
            mockUserRepository.findById.mockResolvedValue(null);
            const newFacility = { _id: '1', name: 'New Facility' };
            await expect(facilityService.saveUserFacility(newFacility, 'userId'))
                .rejects.toThrowError(new UserNotFoundError('User not found'));
        });

        it('should throw FacilityAlreadyExistsError if facility already exists', async () => {
            const mockUser = { _id: 'userId', facilities: [], save: jest.fn() };
            const existingFacility = { _id: '1', name: 'Existing Facility' };
            mockUserRepository.findById.mockResolvedValue(mockUser);
            mockFacilityRepository.findById.mockResolvedValue(existingFacility);
            await expect(facilityService.saveUserFacility(existingFacility, 'userId'))
                .rejects.toThrowError(new FacilityAlreadyExistsError('Facility already exists'));
        });
    });

    describe('updateUserFacility', () => {
        it('should update and return facility if found and authorized', async () => {
            const mockFacility = { _id: '1', userId: 'userId', name: 'Facility 1' };
            const updatedData = { name: 'Updated Facility' };
            mockFacilityRepository.findById.mockResolvedValue(mockFacility);
            mockFacilityRepository.update.mockResolvedValue({ ...mockFacility, ...updatedData });
            const updatedFacility = await facilityService.updateUserFacility('1', updatedData, 'userId');
            expect(updatedFacility).toEqual({ ...mockFacility, ...updatedData });
        });

        it('should throw FacilityNotFoundError if facility not found', async () => {
            mockFacilityRepository.findById.mockResolvedValue(null);
            await expect(facilityService.updateUserFacility('1', { name: 'Updated Facility' }, 'userId'))
                .rejects.toThrowError(new FacilityNotFoundError('Facility not found'));
        });

        it('should throw InvalidCredentialsError if unauthorized', async () => {
            const mockFacility = { _id: '1', userId: 'anotherUserId', name: 'Facility 1' };
            mockFacilityRepository.findById.mockResolvedValue(mockFacility);
            await expect(facilityService.updateUserFacility('1', { name: 'Updated Facility' }, 'userId'))
                .rejects.toThrowError(new InvalidCredentialsError('Unauthorized'));
        });
    });

    describe('deleteUserFacility', () => {
        it('should delete facility if found and authorized', async () => {
            const mockFacility = { _id: '1', userId: 'userId', name: 'Facility 1' };
            mockFacilityRepository.findById.mockResolvedValue(mockFacility);
            mockFacilityRepository.delete.mockResolvedValue(true);
            const result = await facilityService.deleteUserFacility('1', 'userId');
            expect(result).toBe(true);
        });

        it('should throw FacilityNotFoundError if facility not found', async () => {
            mockFacilityRepository.findById.mockResolvedValue(null);
            await expect(facilityService.deleteUserFacility('1', 'userId'))
                .rejects.toThrowError(new FacilityNotFoundError('Facility not found'));
        });

        it('should throw InvalidCredentialsError if unauthorized', async () => {
            const mockFacility = { _id: '1', userId: 'anotherUserId', name: 'Facility 1' };
            mockFacilityRepository.findById.mockResolvedValue(mockFacility);
            await expect(facilityService.deleteUserFacility('1', 'userId'))
                .rejects.toThrowError(new InvalidCredentialsError('Unauthorized'));
        });
    });
});
