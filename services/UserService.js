import { logger } from '../utils/logger.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtHash.js'
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
            logger.info('Fetching user by ID', { _id: _id });
            const user = await this.userRepository.findById(_id);
            return user ? user : null;
        } catch (error) {
            logger.error('Error retrieving user by ID', { message: error.message, stack: error.stack });
            throw new Error(`Failed to retrieve user: ${error.message}`);
        }
    }

    /**
     * Saves a new user and returns the saved user.
     * @param user - The user to be saved.
     */
    async saveUser(user) {
        try {
            logger.info('Creating a new user', { user: user });

            let savedUser = await this.userRepository.save(user);

            return savedUser;
        } catch (error) {
            logger.error('Error creating user', { message: error.message, stack: error.stack });
            throw new Error('Failed to create user');
        }
    }

    /**
     * Deletes a user by ID.
     * @param _id - The ID of the user to be deleted.
     */
    async deleteUser(_id) {
        try {
            logger.info('Deleting user', { _id: _id.toString() });

            const user = await this.userRepository.findById(_id);

            if (user) {
                await this.userRepository.delete(_id);
                return true;
            }

            return false;
        } catch (error) {
            logger.error('Error deleting user', { message: error.message, stack: error.stack });
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }

    /**
     * Updates a user by ID and returns the updated user.
     * @param _id - The ID of the user to be updated.
     * @param user - The new user details.
     */
    async updateUser(_id, user) {
        try {
            logger.info('Updating user', { _id: _id, user: user });

            const updatedUser = await this.userRepository.update(_id, user);

            if (updatedUser) {
                return updatedUser;
            }

            return null;
        } catch (error) {
            logger.error('Error updating user', { message: error.message, stack: error.stack });
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    /**
     * Authenticates a user by email and password.
     * @param email - The email of the user.
     * @param password - The password of the user.
     */
    async loginUser(email, password) {
        try {
            logger.info('Authenticating user', { email: email });

            const user = await this.userRepository.findByEmail(email);

            if (!user) {
                throw new Error('User not found');
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            const userObject = JSON.parse(JSON.stringify(user)); //TODO: simplify

            const token = generateToken(userObject);


            return {
                user,
                token,
            };
        } catch (error) {
            logger.error('Error authenticating user', { message: error.message, stack: error.stack });
            throw new Error(`Failed to authenticate user: ${error.message}`);
        }
    }
}
