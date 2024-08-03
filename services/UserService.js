import { logger } from '../utils/logger.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtHash.js';
import { UserNotFoundError, UserAlreadyExistsError, InvalidCredentialsError } from '../errors/Errors.js';

export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieves a user by ID and returns it as UserDetailsDTO.
     * @param _id - The ID of the user.
     */
    async getUserById(_id) {
        try {
            logger.info('Fetching user by ID', { _id });
            const user = await this.userRepository.findById(_id);
            if (!user) throw new UserNotFoundError('User not found');
            return user;
        } catch (error) {
            logger.error('Error retrieving user by ID', { error });
            throw error;
        }
    }

    /**
     * Saves a new user and returns the saved user.
     * @param user - The user to be saved.
     * @returns {Promise<User[]>} - A list of users.
     */
    async saveUser(user) {
        try {
            logger.info('Creating a new user', { user });
            const existingUser = await this.userRepository.findByEmail(user.email);
            if (existingUser) throw new UserAlreadyExistsError('User already exists');
            return await this.userRepository.save(user);
        } catch (error) {
            logger.error('Error creating user', { error });
            throw error;
        }
    }

    /**
     * Deletes a user by ID.
     * @param _id - The ID of the user to be deleted.
     */
    async deleteUser(_id) {
        try {
            logger.info('Deleting user', { _id });
            const user = await this.getUserById(_id);
            if (!user) throw new UserNotFoundError('User not found');
            await this.userRepository.delete(_id);
            return true;
        } catch (error) {
            logger.error('Error deleting user', { error });
            throw error;
        }
    }

    /**
     * Updates a user by ID and returns the updated user.
     * @param _id - The ID of the user to be updated.
     * @param user - The new user details.
     */
    async updateUser(_id, user) {
        try {
            logger.info('Updating user', { _id, user });
            const existingUser = await this.getUserById(_id);
            if (!existingUser) throw new UserNotFoundError('User not found');
            return await this.userRepository.update(_id, user);
        } catch (error) {
            logger.error('Error updating user', { error });
            throw error;
        }
    }

    /**
     * Authenticates a user by email and password.
     * @param email - The email of the user.
     * @param password - The password of the user.
     */
    async loginUser(email, password) {
        try {
            logger.info('Authenticating user', { email });
            const user = await this.userRepository.findByEmail(email);
            if (!user) throw new UserNotFoundError('User not found');
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new InvalidCredentialsError('Invalid credentials');
            const token = generateToken(user);
            return { user, token };
        } catch (error) {
            logger.error('Error authenticating user', { error });
            throw error;
        }
    }
}
