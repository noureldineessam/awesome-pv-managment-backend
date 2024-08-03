import { UserService } from '../../services/UserService.js';
import { UserNotFoundError, UserAlreadyExistsError, InvalidCredentialsError } from '../../errors/Errors.js';

import bcrypt from 'bcryptjs';
const mockUserRepository = {
    findById: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findByEmail: jest.fn(),
};

const userService = new UserService(mockUserRepository);

describe('UserService', () => {
    describe('getUserById', () => {
        it('should return user if found', async () => {
            const mockUser = { _id: '1', name: 'John Doe' };
            mockUserRepository.findById.mockResolvedValue(mockUser);
            const user = await userService.getUserById('1');
            expect(user).toEqual(mockUser);
        });

        it('should throw UserNotFoundError if user not found', async () => {
            mockUserRepository.findById.mockResolvedValue(null);
            await expect(userService.getUserById('1')).rejects.toThrowError(new UserNotFoundError('User not found'));
        });
    });

    describe('saveUser', () => {
        it('should save and return user if email is unique', async () => {
            const newUser = { _id: '2', email: 'unique@example.com' };
            mockUserRepository.findByEmail.mockResolvedValue(null);
            mockUserRepository.save.mockResolvedValue(newUser);
            const savedUser = await userService.saveUser(newUser);
            expect(savedUser).toEqual(newUser);
        });

        it('should throw UserAlreadyExistsError if email already exists', async () => {
            const existingUser = { _id: '3', email: 'exists@example.com' };
            mockUserRepository.findByEmail.mockResolvedValue(existingUser);
            await expect(userService.saveUser({ _id: 'new', email: 'exists@example.com' }))
                .rejects.toThrowError(new UserAlreadyExistsError('User already exists'));
        });
    });

    describe('deleteUser', () => {
        it('should delete user if exists', async () => {
            const user = { _id: '4', name: 'Jane Doe' };
            mockUserRepository.findById.mockResolvedValue(user);
            mockUserRepository.delete.mockResolvedValue(true);
            const result = await userService.deleteUser('4');
            expect(result).toBe(true);
        });

        it('should throw UserNotFoundError if user does not exist', async () => {
            mockUserRepository.findById.mockResolvedValue(null);
            await expect(userService.getUserById('5')).rejects.toThrowError(new UserNotFoundError('User not found'));
        });
    });

    describe('loginUser', () => {
        it('should return token and user if credentials are valid', async () => {
            const mockUser = { _id: '6', email: 'test@example.com', password: 'hashedPassword' };
            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
            const result = await userService.loginUser('test@example.com', 'password');
            expect(result.user).toEqual(mockUser);
            expect(result.token).toBeDefined();
        });

        it('should throw InvalidCredentialsError if credentials are invalid', async () => {
            const mockUser = { _id: '7', email: 'test@example.com', password: 'hashedPassword' };
            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
            await expect(userService.loginUser('test@example.com', 'wrongpassword'))
                .rejects.toThrowError(new InvalidCredentialsError('Invalid credentials'));
        });
    });
});
